import { NextRequest, NextResponse } from "next/server";
import { adviseStackHealth } from "@/lib/ai/stack-advisor";
import { createLoopState } from "@/lib/loop/state";
import { verifyCronSecret } from "@/lib/loop/verify-cron";
import { getStackIntegrationStatus } from "@/lib/server-env";

function buildHints(integrations: ReturnType<typeof getStackIntegrationStatus>) {
  return {
    notionLeads:
      !integrations.notionLeads && integrations.followUpBoss
        ? "Run GET /api/cron/bootstrap-notion with CRON_SECRET, then add NOTION_LEADS_DATABASE_ID to Vercel."
        : undefined,
    turnstile: !integrations.turnstile
      ? "Add NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY for form CAPTCHA."
      : undefined,
    smsWebhook:
      integrations.smsAutoReply && !integrations.twilioWebhook
        ? "Set TWILIO_AUTH_TOKEN; point Twilio POST to /api/webhooks/sms"
        : undefined,
    smsAutoReply: !integrations.smsAutoReply
      ? "Enable SMS_AUTO_REPLY_* and configure Twilio inbound webhook."
      : undefined,
  };
}

/**
 * Daily outer loop (Boris Cherny / loop engineering pattern):
 * discover gaps → Claude advisor → durable next-pass prompt for agents.
 */
export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const integrations = getStackIntegrationStatus();
  const active = Object.values(integrations).filter(Boolean).length;
  const total = Object.keys(integrations).length;
  const hints = buildHints(integrations);
  const advisor = await adviseStackHealth(integrations, hints);

  const state = createLoopState({
    integrations,
    summary: `${active}/${total} integrations configured`,
    advisor,
  });

  return NextResponse.json({
    ok: integrations.followUpBoss,
    loop: "lmhy-stack",
    state,
    cursorLoop: `/loop 1d ${state.nextPassPrompt}`,
  });
}
