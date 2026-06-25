import crypto from "crypto";

export type TwilioInboundSms = {
  messageSid: string;
  from: string;
  to: string;
  body: string;
  accountSid?: string;
  optOutType?: string;
};

export function parseTwilioFormBody(
  form: URLSearchParams,
): TwilioInboundSms | null {
  const from = form.get("From");
  const to = form.get("To");
  const body = form.get("Body");
  const messageSid = form.get("MessageSid") ?? form.get("SmsMessageSid");

  if (!from || !to || body === null || !messageSid) {
    return null;
  }

  return {
    messageSid,
    from,
    to,
    body,
    accountSid: form.get("AccountSid") ?? undefined,
    optOutType: form.get("OptOutType") ?? undefined,
  };
}

export function twimlMessage(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`;
}

export function twimlEmpty(): string {
  return `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
}

/**
 * Validates X-Twilio-Signature per Twilio docs.
 * @see https://www.twilio.com/docs/usage/security#validating-requests
 */
export function validateTwilioSignature(
  authToken: string,
  signature: string | null,
  url: string,
  params: Record<string, string>,
): boolean {
  if (!signature) return false;

  const sortedKeys = Object.keys(params).sort();
  let data = url;
  for (const key of sortedKeys) {
    data += key + params[key];
  }

  const expected = crypto
    .createHmac("sha1", authToken)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature),
    );
  } catch {
    return false;
  }
}

export function formParamsToRecord(form: URLSearchParams): Record<string, string> {
  const record: Record<string, string> = {};
  form.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}
