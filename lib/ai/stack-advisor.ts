import { extractJsonObject } from "@/lib/ai/parse-json-reply";
import { createUnifiedChatCompletion } from "@/lib/ai/unified-chat";
import {
  buildStackAdvisorUserPrompt,
  STACK_ADVISOR_SYSTEM,
} from "@/lib/prompts/stack-advisor-prompt";
import { serverEnv } from "@/lib/server-env";
import type { StackIntegrationStatus } from "@/lib/server-env";

export type StackAdvisorAction = {
  title: string;
  reason: string;
  effort: "S" | "M" | "L";
  successCriteria?: string;
};

export type StackAdvisorResult = {
  priority: "high" | "medium" | "low";
  summary: string;
  actions: StackAdvisorAction[];
  compliance: string[];
  seo: string[];
  questions?: string[];
  provider?: string;
};

function fallbackAdvisor(
  integrations: StackIntegrationStatus,
  hints: Record<string, string | undefined>,
): StackAdvisorResult {
  const actions: StackAdvisorAction[] = [];

  if (!integrations.followUpBoss) {
    actions.push({
      title: "Configure FOLLOW_UP_BOSS_API_KEY",
      reason: "Lead capture is broken without FUB",
      effort: "S",
      successCriteria: "followUpBoss: true on /api/health/stack",
    });
  } else if (!integrations.notionLeads) {
    actions.push({
      title: "Fix Notion leads pipeline",
      reason: hints.notionLeads ?? "Set valid NOTION_TOKEN and NOTION_LEADS_DATABASE_ID",
      effort: "S",
      successCriteria: "notionLeads: true; test row after /api/leads/capture",
    });
  } else if (integrations.smsAutoReply && !integrations.twilioWebhook) {
    actions.push({
      title: "Add TWILIO_AUTH_TOKEN for SMS webhook",
      reason: hints.smsWebhook ?? "Inbound SMS needs signature validation",
      effort: "S",
      successCriteria: "twilioWebhook: true on /api/health/stack",
    });
  } else if (!integrations.turnstile) {
    actions.push({
      title: "Enable Turnstile on lead forms",
      reason: hints.turnstile ?? "Reduce form spam",
      effort: "M",
      successCriteria: "turnstile: true; form requires CAPTCHA when configured",
    });
  } else {
    actions.push({
      title: "Smoke-test lead capture end-to-end",
      reason: "All core integrations configured — verify FUB + Notion on test submit",
      effort: "S",
      successCriteria: "Test lead appears in FUB and Notion within 60s",
    });
  }

  return {
    priority: actions[0]?.effort === "S" ? "high" : "medium",
    summary: actions[0]?.title ?? "Stack healthy — run engagement loop",
    actions,
    compliance: integrations.smsAutoReply
      ? ["Confirm STOP/HELP replies and sms-opt-out FUB tag on inbound SMS"]
      : [],
    seo: ["Re-validate GSC canonicals on www for priority URLs monthly"],
    provider: "rules-fallback",
  };
}

async function adviseWithAnthropicDirect(
  userPrompt: string,
): Promise<string | null> {
  const key = serverEnv.anthropicApiKey;
  if (!key) return null;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 900,
      temperature: 0.2,
      system: STACK_ADVISOR_SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    console.warn("[stack-advisor] Anthropic direct failed", response.status);
    return null;
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((c) => c.type === "text")?.text;
  return text ?? null;
}

export async function adviseStackHealth(
  integrations: StackIntegrationStatus,
  hints: Record<string, string | undefined>,
): Promise<StackAdvisorResult> {
  const userPrompt = buildStackAdvisorUserPrompt(integrations, hints);

  try {
    const { reply, provider } = await createUnifiedChatCompletion({
      model: "anthropic/claude-3.5-haiku",
      temperature: 0.2,
      maxTokens: 900,
      messages: [
        { role: "system", content: STACK_ADVISOR_SYSTEM },
        { role: "user", content: userPrompt },
      ],
    });
    const parsed = extractJsonObject<StackAdvisorResult>(reply);
    return { ...parsed, provider };
  } catch (unifiedError) {
    console.warn("[stack-advisor] unified-chat failed, trying Anthropic direct", unifiedError);
  }

  try {
    const direct = await adviseWithAnthropicDirect(userPrompt);
    if (direct) {
      const parsed = extractJsonObject<StackAdvisorResult>(direct);
      return { ...parsed, provider: "anthropic-direct" };
    }
  } catch (directError) {
    console.warn("[stack-advisor] Anthropic direct parse failed", directError);
  }

  return fallbackAdvisor(integrations, hints);
}
