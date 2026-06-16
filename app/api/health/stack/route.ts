import { NextResponse } from "next/server";
import { getStackIntegrationStatus } from "@/lib/server-env";

/** Public-safe integration checklist (no secret values). */
export async function GET() {
  const integrations = getStackIntegrationStatus();
  const active = Object.values(integrations).filter(Boolean).length;
  const total = Object.keys(integrations).length;

  return NextResponse.json({
    ok: integrations.followUpBoss,
    site: "letmehelpyourealtor.com",
    integrations,
    summary: `${active}/${total} integrations configured`,
    hints: {
      notionLeads:
        !integrations.notionLeads && integrations.followUpBoss
          ? "Add NOTION_LEADS_DATABASE_ID in Vercel to enable Notion lead logging."
          : undefined,
      turnstile: !integrations.turnstile
        ? "Add NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY for form CAPTCHA."
        : undefined,
    },
  });
}
