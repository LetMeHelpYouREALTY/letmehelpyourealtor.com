import { NextRequest, NextResponse } from "next/server";
import { handleInboundSms } from "@/lib/sms/handle-inbound";
import {
  formParamsToRecord,
  parseTwilioFormBody,
  twimlEmpty,
  twimlMessage,
  validateTwilioSignature,
} from "@/lib/sms/twilio";
import { serverEnv } from "@/lib/server-env";
import { apiLimiter, checkRateLimit, getClientId } from "@/lib/rate-limit";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

async function isDuplicateMessage(messageSid: string): Promise<boolean> {
  if (!redis) return false;
  const key = `sms:sid:${messageSid}`;
  const set = await redis.set(key, "1", { nx: true, ex: 86400 });
  return set === null;
}

/** Twilio-compatible inbound SMS webhook → FUB + Notion + TCPA auto-reply */
export async function POST(request: NextRequest) {
  try {
    const clientId = getClientId(request);
    if (apiLimiter) {
      const rateLimit = await checkRateLimit(apiLimiter, `sms:${clientId}`);
      if (!rateLimit.success) {
        return new NextResponse(twimlEmpty(), {
          status: 429,
          headers: { "Content-Type": "text/xml" },
        });
      }
    }

    const rawBody = await request.text();
    const form = new URLSearchParams(rawBody);
    const inbound = parseTwilioFormBody(form);

    if (!inbound) {
      return NextResponse.json(
        { error: "Invalid Twilio webhook payload" },
        { status: 400 },
      );
    }

    const authToken = serverEnv.twilioAuthToken;
    if (authToken) {
      const signature = request.headers.get("X-Twilio-Signature");
      const url = request.url.split("?")[0] ?? request.url;
      const valid = validateTwilioSignature(
        authToken,
        signature,
        url,
        formParamsToRecord(form),
      );
      if (!valid) {
        console.warn("[sms-webhook] Invalid Twilio signature");
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    if (await isDuplicateMessage(inbound.messageSid)) {
      return new NextResponse(twimlEmpty(), {
        status: 200,
        headers: { "Content-Type": "text/xml" },
      });
    }

    const result = await handleInboundSms(inbound);

    if (result.replyBody) {
      return new NextResponse(twimlMessage(result.replyBody), {
        status: 200,
        headers: { "Content-Type": "text/xml" },
      });
    }

    return new NextResponse(twimlEmpty(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("[sms-webhook] error", error);
    return new NextResponse(twimlEmpty(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/webhooks/sms",
    provider: "twilio-compatible",
    autoReplyEnabled: serverEnv.smsAutoReplyEnabled,
    configured: Boolean(serverEnv.smsPhoneNumber),
    webhookUrl: "https://www.letmehelpyourealtor.com/api/webhooks/sms",
    docs: "Point Twilio Messaging webhook (POST) here. Set TWILIO_AUTH_TOKEN for signature validation.",
  });
}
