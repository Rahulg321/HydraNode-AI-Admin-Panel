import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
  console.log("calling the post route");

  try {
    const body = await req.json();
    const { topic } = body;
    console.log(topic);

    const result = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      prompt: `You are intelligent educator and are very proficient in generating questions for various exams! I want you to generate 10 mcq questions for this topic: ${topic} along with their answers and options.The answer and their options can be single words or sentences.`,
      schema: z.object({
        question: z.string().describe("the question string"),
        answer: z
          .string()
          .describe(
            "the answer of the above question, can be a single word or a sentence"
          ),
        option1: z.string().describe("the first option of the question"),
        option2: z.string().describe("the second option of the question"),
        option3: z.string().describe("the third option of the question"),
      }),
    });

    console.log(result.object);

    return NextResponse.json(
      {
        result: result.object,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }

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
