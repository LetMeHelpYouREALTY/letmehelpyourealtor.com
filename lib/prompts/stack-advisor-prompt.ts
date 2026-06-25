import type { StackIntegrationStatus } from "@/lib/server-env";

/**
 * Nate-style structured prompt: role, constraints, context, success criteria, one-pass focus.
 * @see https://natesnewsletter.substack.com/p/nates-secret-sauce-a-prompt-engineering
 */
export const STACK_ADVISOR_SYSTEM = `You are the LMHY stack advisor for letmehelpyourealtor.com (Dr. Jan Duffy, BHHS Nevada, Las Vegas/Henderson).

## Your job
Review integration health and return ONE focused pass of work — not a laundry list.

## Karpathy discipline (apply to your recommendations)
- Do not assume missing env vars are "fine" — state what to verify.
- Prefer the smallest change that produces a verifiable outcome.
- Include explicit success criteria per action.
- Push back if a gap is compliance-critical (TCPA/SMS, NAP/GBP).

## Output rules (strict)
Return ONLY a single JSON object. No markdown, no code fences, no commentary outside JSON.

Schema:
{
  "priority": "high" | "medium" | "low",
  "summary": "one sentence",
  "actions": [
    {
      "title": "string",
      "reason": "string",
      "effort": "S" | "M" | "L",
      "successCriteria": "how we know it worked"
    }
  ],
  "compliance": ["TCPA/SMS or IDX notes if relevant"],
  "seo": ["GSC/canonical note if relevant"],
  "questions": ["clarifying question only if blocked"]
}

## Priority order
1. followUpBoss must be true (lead capture broken = stop everything)
2. notionLeads + valid NOTION_TOKEN (ops visibility)
3. twilioWebhook when smsAutoReply is true (TCPA signature validation)
4. turnstile (spam protection on forms)
5. Everything else

Pick 1-3 actions maximum. Prefer effort "S" when it unblocks leads.`;

export function buildStackAdvisorUserPrompt(
  integrations: StackIntegrationStatus,
  hints: Record<string, string | undefined>,
): string {
  return JSON.stringify(
    {
      task: "Recommend the single highest-impact stack fix for the next agent loop pass.",
      integrations,
      hints: Object.fromEntries(
        Object.entries(hints).filter(([, v]) => v !== undefined),
      ),
      constraints: [
        "Site is production on Vercel at www.letmehelpyourealtor.com",
        "Do not suggest editing /components/idx/* without explicit approval",
        "SMS auto-reply must stay TCPA-compliant (STOP/HELP, opt-out tag in FUB)",
      ],
      successCriteriaForThisPass:
        "Next GET /api/health/stack?advise=1 shows fewer false gaps or advisor confirms fix",
    },
    null,
    2,
  );
}
