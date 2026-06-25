import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/loop/verify-cron";
import { ensureLmhyLeadsDatabase } from "@/lib/notion/bootstrap-leads-database";
import { serverEnv } from "@/lib/server-env";

/**
 * Production bootstrap for Notion leads DB when NOTION_TOKEN is valid on Vercel.
 * After first run, add returned databaseId as NOTION_LEADS_DATABASE_ID and redeploy.
 */
export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!serverEnv.notionToken || serverEnv.notionToken.length < 10) {
    return NextResponse.json(
      {
        ok: false,
        error: "NOTION_TOKEN missing or invalid in Vercel (must be secret_… integration token)",
      },
      { status: 400 },
    );
  }

  try {
    const { databaseId, created } = await ensureLmhyLeadsDatabase();

    return NextResponse.json({
      ok: true,
      databaseId,
      created,
      nextStep:
        created || !serverEnv.notionLeadsDatabaseId
          ? `Add to Vercel: NOTION_LEADS_DATABASE_ID=${databaseId} (Production + Preview), then redeploy.`
          : "NOTION_LEADS_DATABASE_ID already configured.",
    });
  } catch (error) {
    console.error("[bootstrap-notion]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Bootstrap failed",
      },
      { status: 500 },
    );
  }
}
