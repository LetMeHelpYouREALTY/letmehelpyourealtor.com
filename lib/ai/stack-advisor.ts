import { createUnifiedChatCompletion } from "@/lib/ai/unified-chat";
import type { StackIntegrationStatus } from "@/lib/server-env";

const ADVISOR_SYSTEM = `You are a technical advisor for letmehelpyourealtor.com (Dr. Jan Duffy, Las Vegas real estate).
Given integration health JSON, return ONLY valid JSON (no markdown) with this shape:
{
  "priority": "high" | "medium" | "low",
  "summary": "one sentence",
  "actions": [{"title": string, "reason": string, "effort": "S" | "M" | "L"}],
  "compliance": ["TCPA/SMS notes if sms involved"],
  "seo": ["GSC/SEO note if relevant"]
}
Pick 1-3 highest-impact actions only. Prefer: FUB lead capture, Notion logging, SMS TCPA compliance, Turnstile, GA4, canonical www.`;

export type StackAdvisorResult = {
  priority: "high" | "medium" | "low";
  summary: string;
  actions: Array<{
    title: string;
    reason: string;
    effort: "S" | "M" | "L";
  }>;
  compliance: string[];
  seo: string[];
  provider?: string;
};

export async function adviseStackHealth(
  integrations: StackIntegrationStatus,
  hints: Record<string, string | undefined>,
): Promise<StackAdvisorResult | null> {
  try {
    const { reply, provider } = await createUnifiedChatCompletion({
      model: "anthropic/claude-3.5-haiku",
      temperature: 0.2,
      maxTokens: 600,
      messages: [
        { role: "system", content: ADVISOR_SYSTEM },
        {
          role: "user",
          content: JSON.stringify({ integrations, hints }, null, 2),
        },
      ],
    });

    const parsed = JSON.parse(reply) as StackAdvisorResult;
    return { ...parsed, provider };
  } catch (error) {
    console.warn("[stack-advisor] Claude advisor unavailable", error);
    return null;
  }
}
