import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST() {
  try {
    const result = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      prompt: "tell me a joke about a programmer who wants to change the world",
      schema: z.object({
        setup: z.string().describe("the setup of the joke"),
        punchline: z.string().describe("the punchline of the joke"),
      }),
    });

    return NextResponse.json(
      {
        result: result.object,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
