import type { StackAdvisorResult } from "@/lib/ai/stack-advisor";
import type { StackIntegrationStatus } from "@/lib/server-env";

export type LoopState = {
  updatedAt: string;
  site: string;
  integrations: StackIntegrationStatus;
  summary: string;
  advisor: StackAdvisorResult;
  nextPassPrompt: string;
};

export function buildNextPassPrompt(advisor: StackAdvisorResult): string {
  const top = advisor.actions[0];
  if (!top) {
    return "LMHY stack loop: all integrations green — run engagement loop (CTAs, GSC, mobile sticky).";
  }

  return [
    "LMHY stack loop (one fix only):",
    top.title,
    `Reason: ${top.reason}`,
    top.successCriteria ? `Done when: ${top.successCriteria}` : "",
    "Verify: GET /api/health/stack?advise=1 on www production.",
  ]
    .filter(Boolean)
    .join(" ");
}

export function createLoopState(input: {
  integrations: StackIntegrationStatus;
  summary: string;
  advisor: StackAdvisorResult;
}): LoopState {
  return {
    updatedAt: new Date().toISOString(),
    site: "letmehelpyourealtor.com",
    integrations: input.integrations,
    summary: input.summary,
    advisor: input.advisor,
    nextPassPrompt: buildNextPassPrompt(input.advisor),
  };
}
