/** TCPA / carrier opt-out keywords (Twilio Advanced Opt-Out compatible). */
const OPT_OUT_KEYWORDS = new Set([
  "stop",
  "stopall",
  "unsubscribe",
  "cancel",
  "end",
  "quit",
  "revoke",
  "optout",
  "opt-out",
]);

const HELP_KEYWORDS = new Set(["help", "info"]);

const START_KEYWORDS = new Set(["start", "unstop", "yes"]);

export function normalizeSmsBody(body: string): string {
  return body.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isOptOutMessage(body: string): boolean {
  const normalized = normalizeSmsBody(body);
  const firstToken = normalized.split(" ")[0] ?? "";
  return OPT_OUT_KEYWORDS.has(firstToken) || OPT_OUT_KEYWORDS.has(normalized);
}

export function isHelpMessage(body: string): boolean {
  const normalized = normalizeSmsBody(body);
  const firstToken = normalized.split(" ")[0] ?? "";
  return HELP_KEYWORDS.has(firstToken);
}

export function isOptInMessage(body: string): boolean {
  const normalized = normalizeSmsBody(body);
  const firstToken = normalized.split(" ")[0] ?? "";
  return START_KEYWORDS.has(firstToken);
}

const COMPLIANCE_SUFFIX =
  " Msg&data rates may apply. Reply STOP to opt out, HELP for help.";

/**
 * Ensures first-touch auto-replies include business identity + opt-out language.
 * Based on TCPA 2025+ guidance: honor STOP immediately, include opt-out on first reply.
 */
export function buildAutoReplyMessage(template: string): string {
  const trimmed = template.trim();
  const lower = trimmed.toLowerCase();
  const hasStop = lower.includes("stop");
  const hasHelp = lower.includes("help");
  const hasRates = lower.includes("msg") || lower.includes("data rates");

  let message = trimmed;
  if (!hasStop || !hasHelp || !hasRates) {
    message = `${trimmed}${COMPLIANCE_SUFFIX}`;
  }
  return message.slice(0, 1600);
}

export const OPT_OUT_CONFIRMATION =
  "You have been unsubscribed from Let Me Help You REALTOR texts. No further messages will be sent. Reply START to resubscribe.";

export const HELP_RESPONSE =
  "Let Me Help You REALTOR — Dr. Jan Duffy, BHHS Nevada. Call (702) 500-1942 or visit letmehelpyourealtor.com. Reply STOP to opt out.";

export const OPT_IN_CONFIRMATION =
  "You are resubscribed to messages from Let Me Help You REALTOR. Reply STOP anytime to opt out.";
