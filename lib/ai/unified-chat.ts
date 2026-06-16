import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionCreateParamsNonStreaming,
} from "openai/resources/chat/completions";
import { serverEnv } from "@/lib/server-env";

export type UnifiedChatOptions = {
  messages: ChatCompletionMessageParam[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
};

const LMHY_SYSTEM =
  "You are a friendly real estate assistant for Dr. Jan Duffy (Let Me Help You REALTOR), Berkshire Hathaway HomeServices Nevada Properties, Las Vegas and Henderson NV. Be concise, warm, and professional. Mention (702) 500-1942 for personalized help. June 2026 market is balanced with buyer concession opportunities.";

type Provider = "ai-gateway" | "openrouter" | "openai-direct";

function getProviderOrder(): Provider[] {
  const order: Provider[] = [];
  if (serverEnv.aiGatewayApiKey) order.push("ai-gateway");
  if (serverEnv.openRouterApiKey) order.push("openrouter");
  if (serverEnv.openAiApiKey) order.push("openai-direct");
  return order;
}

function createClient(provider: Provider): OpenAI {
  switch (provider) {
    case "ai-gateway":
      return new OpenAI({
        apiKey: serverEnv.aiGatewayApiKey,
        baseURL: "https://gateway.ai.vercel.com/v1",
      });
    case "openrouter":
      return new OpenAI({
        apiKey: serverEnv.openRouterApiKey,
        baseURL: "https://openrouter.ai/api/v1",
      });
    case "openai-direct":
      return new OpenAI({
        apiKey: serverEnv.openAiApiKey,
      });
    default: {
      const _exhaustive: never = provider;
      return _exhaustive;
    }
  }
}

function defaultModel(provider: Provider): string {
  switch (provider) {
    case "ai-gateway":
      return "anthropic/claude-3.5-haiku";
    case "openrouter":
      return "anthropic/claude-3.5-haiku";
    case "openai-direct":
      return "gpt-4o-mini";
    default: {
      const _exhaustive: never = provider;
      return _exhaustive;
    }
  }
}

export async function createUnifiedChatCompletion(
  options: UnifiedChatOptions,
): Promise<{ reply: string; provider: Provider }> {
  const providers = getProviderOrder();
  if (providers.length === 0) {
    throw new Error(
      "No AI provider configured. Set AI_GATEWAY_API_KEY, OPENROUTER_API_KEY, or openaikey.",
    );
  }

  const messages: ChatCompletionMessageParam[] = options.messages.some(
    (m) => m.role === "system",
  )
    ? options.messages
    : [{ role: "system", content: LMHY_SYSTEM }, ...options.messages];

  const params: ChatCompletionCreateParamsNonStreaming = {
    model: options.model ?? defaultModel(providers[0]),
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 500,
  };

  let lastError: unknown;
  for (const provider of providers) {
    try {
      const client = createClient(provider);
      const response = await client.chat.completions.create({
        ...params,
        model: options.model ?? defaultModel(provider),
      });
      const reply = response.choices[0]?.message?.content;
      if (!reply) {
        throw new Error("Empty model response");
      }
      return { reply, provider };
    } catch (error) {
      lastError = error;
      console.warn(`[unified-chat] ${provider} failed, trying next provider`, error);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("All AI providers failed");
}
