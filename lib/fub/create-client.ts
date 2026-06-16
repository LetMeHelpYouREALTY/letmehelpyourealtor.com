import { FollowUpBossClient } from "@/lib/fub/client";
import { serverEnv } from "@/lib/server-env";

export function createFollowUpBossClient(): FollowUpBossClient {
  const apiKey = serverEnv.fubApiKey;
  if (!apiKey) {
    throw new Error(
      "Follow Up Boss API key missing. Set FOLLOW_UP_BOSS_API_KEY or FUB_API_KEY in Vercel.",
    );
  }

  return new FollowUpBossClient({
    apiKey,
    systemKey: serverEnv.fubSystemKey,
    baseUrl: serverEnv.fubBaseUrl,
  });
}
