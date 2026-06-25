import { createFollowUpBossClient } from "@/lib/fub/create-client";
import { logLeadToNotion } from "@/lib/notion/log-lead";
import { serverEnv } from "@/lib/server-env";
import {
  buildAutoReplyMessage,
  HELP_RESPONSE,
  isHelpMessage,
  isOptInMessage,
  isOptOutMessage,
  OPT_IN_CONFIRMATION,
  OPT_OUT_CONFIRMATION,
} from "@/lib/sms/tcpa";
import type { TwilioInboundSms } from "@/lib/sms/twilio";

export type InboundSmsResult = {
  replyBody?: string;
  fubPersonId?: number;
  action: "opt-out" | "opt-in" | "help" | "auto-reply" | "logged-only" | "skipped";
};

const SMS_OPT_OUT_TAG = "sms-opt-out";
const SMS_INBOUND_TAG = "sms-inbound";

function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, "");
}

async function personHasOptOutTag(personId: number): Promise<boolean> {
  try {
    const fub = createFollowUpBossClient();
    const person = await fub.getPerson(personId);
    return (person.tags ?? []).some(
      (t) => t.toLowerCase() === SMS_OPT_OUT_TAG,
    );
  } catch {
    return false;
  }
}

async function syncInboundToFub(
  phone: string,
  body: string,
  tags: string[],
): Promise<number | undefined> {
  const fub = createFollowUpBossClient();
  const person = await fub.upsertPerson({
    phones: [{ value: phone }],
    source: "SMS Inbound",
  });

  if (person.id) {
    for (const tag of tags) {
      try {
        await fub.addTag(person.id, tag);
      } catch {
        // Tag may already exist
      }
    }

    await fub.createEvent({
      source: "Let Me Help You REALTOR",
      type: "SMS",
      message: body,
      personId: person.id,
      data: { channel: "sms", direction: "inbound" },
    });
  }

  return person.id;
}

/**
 * Process inbound SMS: FUB CRM sync, Notion log, TCPA-compliant auto-reply text.
 */
export async function handleInboundSms(
  inbound: TwilioInboundSms,
): Promise<InboundSmsResult> {
  const phone = normalizePhone(inbound.from);
  const body = inbound.body.trim();

  if (inbound.optOutType?.toUpperCase() === "STOP" || isOptOutMessage(body)) {
    const personId = await syncInboundToFub(phone, body, [
      SMS_OPT_OUT_TAG,
      SMS_INBOUND_TAG,
    ]);
    void logLeadToNotion({
      name: phone,
      phone,
      source: "SMS opt-out",
      message: body,
      fubPersonId: personId,
      channel: "SMS",
    });
    return { action: "opt-out", replyBody: OPT_OUT_CONFIRMATION, fubPersonId: personId };
  }

  if (isHelpMessage(body)) {
    return { action: "help", replyBody: HELP_RESPONSE };
  }

  if (isOptInMessage(body)) {
    const personId = await syncInboundToFub(phone, body, [SMS_INBOUND_TAG]);
    void logLeadToNotion({
      name: phone,
      phone,
      source: "SMS opt-in",
      message: body,
      fubPersonId: personId,
      channel: "SMS",
    });
    return { action: "opt-in", replyBody: OPT_IN_CONFIRMATION, fubPersonId: personId };
  }

  const personId = await syncInboundToFub(phone, body, [SMS_INBOUND_TAG]);
  void logLeadToNotion({
    name: phone,
    phone,
    source: "SMS inbound",
    message: body,
    fubPersonId: personId,
    channel: "SMS",
  });

  if (personId && (await personHasOptOutTag(personId))) {
    return { action: "skipped", fubPersonId: personId };
  }

  if (
    serverEnv.smsAutoReplyEnabled &&
    serverEnv.smsAutoReplyMessage
  ) {
    const replyBody = buildAutoReplyMessage(serverEnv.smsAutoReplyMessage);
    return { action: "auto-reply", replyBody, fubPersonId: personId };
  }

  return { action: "logged-only", fubPersonId: personId };
}
