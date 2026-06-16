import { NextRequest, NextResponse } from "next/server";
import { createUnifiedChatCompletion } from "@/lib/ai/unified-chat";

export async function POST(request: NextRequest) {
  try {
    const { prompt, conversation = [] } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const { reply, provider } = await createUnifiedChatCompletion({
      messages: [
        ...conversation,
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({ reply, provider });
  } catch (error) {
    console.error("Unified chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
