import { NextRequest, NextResponse } from "next/server";
import { createUnifiedChatCompletion } from "@/lib/ai/unified-chat";

export async function POST(request: NextRequest) {
  try {
    const { propertyDetails } = await request.json();

    if (!propertyDetails) {
      return NextResponse.json({ error: "Property details are required" }, { status: 400 });
    }

    const prompt = `Generate a compelling, SEO-friendly property description for a real estate listing in Las Vegas or Henderson, Nevada. 

Property Details:
- Address/Location: ${propertyDetails.location || "Not specified"}
- Bedrooms: ${propertyDetails.bedrooms || "Not specified"}
- Bathrooms: ${propertyDetails.bathrooms || "Not specified"}
- Square Feet: ${propertyDetails.squareFeet || "Not specified"}
- Price: ${propertyDetails.price || "Not specified"}
- Year Built: ${propertyDetails.yearBuilt || "Not specified"}
- Additional Features: ${propertyDetails.features || "None specified"}

Requirements:
- Write 2-3 engaging paragraphs (150-250 words)
- Highlight key features and benefits
- Use natural, appealing language
- Include location benefits (proximity to amenities, schools, etc.)
- Make it compelling for potential buyers
- Keep it professional and accurate`;

    const { reply: description } = await createUnifiedChatCompletion({
      messages: [
        {
          role: "system",
          content:
            "You are an expert real estate copywriter specializing in Las Vegas and Henderson, Nevada properties.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      maxTokens: 400,
    });

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Property description API error:", error);
    return NextResponse.json(
      { error: "Failed to generate property description" },
      { status: 500 },
    );
  }
}
