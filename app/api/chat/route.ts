import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: "sk-proj-1vWWtUHA9qsAvQWELMoBT3BlbkFJ3qDHvvCXekXMW8v1gSAU",
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

export async function POST() {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4-turbo"),
      schema: z.object({
        setup: z.string().describe("the setup of the joke"),
        punchline: z.string().describe("the punchline of the joke"),
      }),
      prompt:
        "Tell a joke about a person who is taking a gap year before going for masters",
    });
    return NextResponse.json(
      { object },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error occured", error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
