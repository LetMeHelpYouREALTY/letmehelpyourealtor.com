/**
 * Resolves Vercel / local env names to a single canonical value per integration.
 * Vercel dashboard names are listed first; legacy code names are fallbacks.
 */

function firstDefined(...values: Array<string | undefined>): string | undefined {
  return values.find((v) => typeof v === "string" && v.trim().length > 0);
}

function flag(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined) return defaultValue;
  return !["false", "0", "no", "off"].includes(value.toLowerCase());
}

export const serverEnv = {
  /** Follow Up Boss */
  get fubApiKey() {
    return firstDefined(
      process.env.FOLLOW_UP_BOSS_API_KEY,
      process.env.FUB_API_KEY,
    );
  },
  get fubSystemKey() {
    return firstDefined(process.env.FUB_SYSTEM_KEY);
  },
  get fubBaseUrl() {
    return firstDefined(
      process.env.FOLLOW_UP_BOSS_BASE_URL,
      "https://api.followupboss.com/v1",
    );
  },
  get fubAgentId() {
    return firstDefined(
      process.env.FOLLOW_UP_BOSS_AGENT_ID,
      process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID,
    );
  },

  /** Anthropic / Claude */
  get anthropicApiKey() {
    return firstDefined(
      process.env.CLAUDE_API_KEY,
      process.env.ANTHROPIC_API_KEY,
    );
  },

  /** OpenAI-compatible providers */
  get openRouterApiKey() {
    return firstDefined(process.env.OPENROUTER_API_KEY);
  },
  get openAiApiKey() {
    return firstDefined(process.env.OPENAI_API_KEY, process.env.openaikey);
  },
  get aiGatewayApiKey() {
    return firstDefined(process.env.AI_GATEWAY_API_KEY);
  },

  /** Notion lead logging */
  get notionToken() {
    return firstDefined(process.env.NOTION_TOKEN);
  },
  get notionLeadsDatabaseId() {
    return firstDefined(process.env.NOTION_LEADS_DATABASE_ID);
  },

  /** Analytics */
  get gaMeasurementId() {
    return firstDefined(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  },

  /** Cloudinary */
  get cloudinaryCloudName() {
    return firstDefined(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  },
  get cloudinaryApiKey() {
    return firstDefined(process.env.CLOUDINARY_API_KEY);
  },
  get cloudinaryApiSecret() {
    return firstDefined(process.env.CLOUDINARY_API_SECRET);
  },
  get cloudinaryFolder() {
    return firstDefined(process.env.CLOUDINARY_FOLDER, "letmehelpyourealtor");
  },

  /** Google Maps */
  get googleMapsApiKey() {
    return firstDefined(
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      process.env.VITE_GOOGLE_MAPS_API_KEY,
    );
  },

  /** SMS auto-reply (Follow Up Ace / Twilio-style — configure provider separately) */
  get smsAutoReplyEnabled() {
    return flag(process.env.SMS_AUTO_REPLY_ENABLED, false);
  },
  get smsPhoneNumber() {
    return firstDefined(process.env.SMS_PHONE_NUMBER);
  },
  get smsAutoReplyMessage() {
    return firstDefined(process.env.SMS_AUTO_REPLY_MESSAGE);
  },
  get twilioAuthToken() {
    return firstDefined(process.env.TWILIO_AUTH_TOKEN);
  },
  get twilioAccountSid() {
    return firstDefined(process.env.TWILIO_ACCOUNT_SID);
  },

  /** Design / ops (MCP & automations — not used in runtime routes) */
  get v0ApiKey() {
    return firstDefined(process.env.V0_API_KEY);
  },
  get linearApiKey() {
    return firstDefined(process.env.LINEAR_API_KEY, process.env.Linear);
  },
} as const;

export type StackIntegrationStatus = {
  followUpBoss: boolean;
  anthropic: boolean;
  openRouter: boolean;
  aiGateway: boolean;
  notionLeads: boolean;
  googleAnalytics: boolean;
  cloudinary: boolean;
  googleMaps: boolean;
  smsAutoReply: boolean;
  twilioWebhook: boolean;
  realScout: boolean;
  turnstile: boolean;
};

export function getStackIntegrationStatus(): StackIntegrationStatus {
  return {
    followUpBoss: Boolean(serverEnv.fubApiKey),
    anthropic: Boolean(serverEnv.anthropicApiKey),
    openRouter: Boolean(serverEnv.openRouterApiKey),
    aiGateway: Boolean(serverEnv.aiGatewayApiKey),
    notionLeads: Boolean(serverEnv.notionToken && serverEnv.notionLeadsDatabaseId),
    googleAnalytics: Boolean(serverEnv.gaMeasurementId),
    cloudinary: Boolean(serverEnv.cloudinaryCloudName),
    googleMaps: Boolean(serverEnv.googleMapsApiKey),
    smsAutoReply:
      serverEnv.smsAutoReplyEnabled &&
      Boolean(serverEnv.smsPhoneNumber && serverEnv.smsAutoReplyMessage),
    twilioWebhook: Boolean(serverEnv.twilioAuthToken),
    realScout: Boolean(process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID),
    turnstile: Boolean(
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
        process.env.TURNSTILE_SECRET_KEY,
    ),
  };
}
