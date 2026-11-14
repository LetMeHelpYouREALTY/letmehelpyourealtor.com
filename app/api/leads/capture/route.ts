/**
 * Lead Capture API - Send leads to Follow Up Boss
 * 
 * Features:
 * - Auto-enrichment with source tracking
 * - Duplicate detection
 * - Stage assignment
 * - Tag management
 * - Integration with Claude AI for qualification
 */

import { NextRequest, NextResponse } from 'next/server';
import { createFollowUpBossClient } from '@/lib/fub/create-client';
import { logLeadToNotion } from '@/lib/notion/log-lead';
import { leadFormLimiter, getClientId, checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

export interface LeadCaptureRequest {
  // Required
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;

  // Optional
  source?: string;
  stage?: string;
  tags?: string[];
  message?: string;
  
  // Property search criteria
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  neighborhoods?: string[];

  // Additional info
  timeline?: string;
  financing?: string;
  preApproved?: boolean;
  
  // Security
  turnstileToken?: string;
  
  // Custom fields
  customFields?: Record<string, any>;
}

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not configured - skipping verification');
    return true; // Allow in development
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadCaptureRequest = await request.json();

    // Check rate limit (5 submissions per hour per IP)
    const clientId = getClientId(request);
    const rateLimit = await checkRateLimit(leadFormLimiter, clientId);
    
    if (!rateLimit.success) {
      const resetDate = new Date(rateLimit.reset);
      const minutesUntilReset = Math.ceil((rateLimit.reset - Date.now()) / 60000);
      
      return NextResponse.json(
        { 
          error: `Too many submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
          retryAfter: resetDate.toISOString(),
        },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimit),
        }
      );
    }

    // Verify Turnstile CAPTCHA (if configured)
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) {
      if (!data.turnstileToken) {
        return NextResponse.json(
          { error: 'CAPTCHA verification required' },
          { status: 400 }
        );
      }

      const isValid = await verifyTurnstileToken(data.turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    // Validate required fields
    if (!data.email && !data.phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    if (!data.firstName && !data.lastName && !data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const fub = createFollowUpBossClient();

    // Split a single name field into first/last for FUB
    const fullName = (data.name || `${data.firstName || ''} ${data.lastName || ''}`).trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    const lastName = data.lastName || rest.join(' ') || undefined;

    const tags = Array.from(
      new Set(
        [
          ...(data.tags || []),
          "website-lead",
          "lmhy",
          getSourceTag(data.source),
          ...getPropertyTags(data),
        ].filter((t): t is string => Boolean(t)),
      ),
    );

    // Extra details go in the event description so the agent sees them
    const details = [
      buildSearchCriteria(data),
      data.preApproved !== undefined ? `Pre-approved: ${data.preApproved ? 'Yes' : 'No'}` : null,
      `Page: ${request.headers.get('referer') || 'direct'}`,
    ].filter(Boolean).join('\n');

    // Send the lead with POST /events, FUB's supported way to add website
    // leads (dedupes by email/phone, assigns the agent, runs automations).
    // The old PUT /people call is not a FUB endpoint and returned 405.
    const { status, person } = await fub.sendLead({
      source: enrichSource(data.source, request),
      system: 'letmehelpyourealtor.com',
      type: 'General Inquiry',
      message: data.message || 'Website form submission',
      description: details,
      person: {
        firstName: data.firstName || firstName || undefined,
        lastName,
        emails: data.email ? [{ value: data.email }] : undefined,
        phones: data.phone ? [{ value: data.phone }] : undefined,
        tags,
      },
    });

    if (status === 204 || !person) {
      // FUB accepted the request but the lead flow for this source is archived
      console.warn('[Lead Capture] FUB lead flow for this source is archived; lead ignored');
    }
    const existingPerson = status === 200;

    void logLeadToNotion({
      name: fullName || 'Website lead',
      email: data.email,
      phone: data.phone,
      source: data.source,
      message: data.message,
      fubPersonId: person?.id,
      tags,
    }).catch((err) => console.error('[Notion] lead log error', err));

    return NextResponse.json(
      {
        success: true,
        personId: person?.id ?? null,
        isNew: !existingPerson,
        message: existingPerson 
          ? 'Lead updated successfully' 
          : 'Lead created successfully',
      },
      {
        headers: getRateLimitHeaders(rateLimit),
      }
    );

  } catch (error) {
    console.error('[Lead Capture] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to capture lead',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Enrich source with UTM parameters and referrer
 */
function enrichSource(source: string | undefined, request: NextRequest): string {
  const url = new URL(request.url);
  
  // Check UTM parameters
  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');

  if (utmSource) {
    return `${utmSource}${utmMedium ? `/${utmMedium}` : ''}${utmCampaign ? `/${utmCampaign}` : ''}`;
  }

  // Check referrer
  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      if (!refUrl.hostname.includes("letmehelpyourealtor.com")) {
        return `referral/${refUrl.hostname}`;
      }
    } catch (e) {
      // Invalid URL
    }
  }

  return source || 'website/direct';
}

/**
 * Get source-specific tag
 */
function getSourceTag(source?: string): string | null {
  if (!source) return null;

  const lowerSource = source.toLowerCase();

  // Let Me Help You REALTOR page sources
  if (lowerSource.includes("luxury")) return "luxury-page";
  if (lowerSource.includes("relocation")) return "relocation-page";
  if (lowerSource.includes("buyers")) return "buyers-page";
  if (lowerSource.includes("sellers")) return "sellers-page";
  if (lowerSource.includes("services")) return "services-page";
  if (lowerSource.includes("homepage") || lowerSource.includes("quick-connect")) {
    return "homepage-lead";
  }
  if (lowerSource.includes("home-valuation")) return "valuation-page";
  if (lowerSource.includes("contact")) return "contact-page";

  if (lowerSource.includes("facebook")) return "facebook-lead";
  if (lowerSource.includes("google")) return "google-lead";
  if (lowerSource.includes("zillow")) return "zillow-lead";
  if (lowerSource.includes("realtor.com")) return "realtor-lead";
  if (lowerSource.includes("instagram")) return "instagram-lead";

  return "website-form";
}

/**
 * Get property-specific tags
 */
function getPropertyTags(data: LeadCaptureRequest): string[] {
  const tags: string[] = [];

  // Neighborhood tags
  if (data.neighborhoods) {
    tags.push(...data.neighborhoods);
  }

  // Budget tags
  if (data.priceMax) {
    if (data.priceMax > 1000000) {
      tags.push('luxury');
    } else if (data.priceMax < 300000) {
      tags.push('first-time-buyer');
    }
  }

  // Property type tags
  if (data.propertyType) {
    tags.push(data.propertyType.toLowerCase());
  }

  // Financing tags
  if (data.preApproved) {
    tags.push('pre-approved');
  }

  // Timeline tags
  if (data.timeline) {
    const lowerTimeline = data.timeline.toLowerCase();
    if (lowerTimeline.includes('immediately') || lowerTimeline.includes('asap')) {
      tags.push('urgent');
    }
  }

  return tags;
}

/**
 * Build search criteria summary
 */
function buildSearchCriteria(data: LeadCaptureRequest): string | null {
  const criteria: string[] = [];

  if (data.propertyType) {
    criteria.push(`Type: ${data.propertyType}`);
  }

  if (data.priceMin || data.priceMax) {
    const min = data.priceMin ? `$${data.priceMin.toLocaleString()}` : 'Any';
    const max = data.priceMax ? `$${data.priceMax.toLocaleString()}` : 'Any';
    criteria.push(`Price: ${min} - ${max}`);
  }

  if (data.bedrooms) {
    criteria.push(`Bedrooms: ${data.bedrooms}+`);
  }

  if (data.bathrooms) {
    criteria.push(`Bathrooms: ${data.bathrooms}+`);
  }

  if (data.neighborhoods && data.neighborhoods.length > 0) {
    criteria.push(`Areas: ${data.neighborhoods.join(', ')}`);
  }

  if (data.timeline) {
    criteria.push(`Timeline: ${data.timeline}`);
  }

  if (data.financing) {
    criteria.push(`Financing: ${data.financing}`);
  }

  return criteria.length > 0 ? criteria.join('\n') : null;
}
