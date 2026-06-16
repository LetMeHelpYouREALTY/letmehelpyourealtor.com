/**
 * Cloudflare Email Routing handler for DrDuffy@LetMeHelpYouRealtor.com
 * Forwards inbound mail to FORWARD_TO (verified destination in Cloudflare).
 */

export interface Env {
  /** Verified destination — e.g. homes@heyberkshire.com */
  FORWARD_TO: string;
  /** Expected recipient (logging / future multi-address routing) */
  INBOUND_ADDRESS: string;
}

export default {
  async email(message, env, ctx): Promise<void> {
    const forwardTo = env.FORWARD_TO?.trim();
    if (!forwardTo) {
      console.error("FORWARD_TO secret is not configured");
      message.setReject("Mail service misconfigured.");
      return;
    }

    const inbound = env.INBOUND_ADDRESS?.trim().toLowerCase();
    if (inbound && forwardTo.toLowerCase() === inbound) {
      console.error("FORWARD_TO must differ from INBOUND_ADDRESS");
      message.setReject("Mail service misconfigured.");
      return;
    }

    const subject = message.headers.get("subject") ?? "(no subject)";

    try {
      await message.forward(forwardTo, new Headers({
        "X-Forwarded-For-Address": message.to,
        "X-Original-From": message.from,
      }));
      console.log(
        JSON.stringify({
          event: "email_forwarded",
          from: message.from,
          to: message.to,
          forwardTo,
          subject,
          size: message.rawSize,
        }),
      );
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "email_forward_failed",
          from: message.from,
          to: message.to,
          forwardTo,
          error: error instanceof Error ? error.message : String(error),
        }),
      );
      message.setReject("Unable to deliver message. Please try again later.");
    }
  },
} satisfies ExportedHandler<Env>;
