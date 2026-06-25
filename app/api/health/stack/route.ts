import { NextRequest, NextResponse } from "next/server";
import { adviseStackHealth } from "@/lib/ai/stack-advisor";
import { getStackIntegrationStatus } from "@/lib/server-env";

function buildHints(integrations: ReturnType<typeof getStackIntegrationStatus>) {
  return {
    notionLeads:
      !integrations.notionLeads && integrations.followUpBoss
        ? "Add NOTION_LEADS_DATABASE_ID in Vercel. Run: node scripts/bootstrap-notion-leads.mjs"
        : undefined,
    turnstile: !integrations.turnstile
      ? "Add NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY for form CAPTCHA."
      : undefined,
    smsWebhook:
      integrations.smsAutoReply && !integrations.twilioWebhook
        ? "Set TWILIO_AUTH_TOKEN and point Twilio webhook to /api/webhooks/sms for signature validation."
        : undefined,
    smsAutoReply: !integrations.smsAutoReply
      ? "Enable SMS_AUTO_REPLY_ENABLED with SMS_PHONE_NUMBER and SMS_AUTO_REPLY_MESSAGE; configure Twilio inbound webhook."
      : undefined,
  };
}

/** Public-safe integration checklist (no secret values). */
export async function GET(request: NextRequest) {
  const integrations = getStackIntegrationStatus();
  const active = Object.values(integrations).filter(Boolean).length;
  const total = Object.keys(integrations).length;
  const hints = buildHints(integrations);

  const advise = request.nextUrl.searchParams.get("advise") === "1";
  const advisor = advise
    ? await adviseStackHealth(integrations, hints)
    : undefined;

  return NextResponse.json({
    ok: integrations.followUpBoss,
    site: "letmehelpyourealtor.com",
    integrations,
    summary: `${active}/${total} integrations configured`,
    hints,
    advisor,
    endpoints: {
      smsWebhook: "/api/webhooks/sms",
      fubWebhook: "/api/webhooks/fub",
      leadCapture: "/api/leads/capture",
    },
  });
}
