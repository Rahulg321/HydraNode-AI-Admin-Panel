import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const questionSchema = z.object({
  question: z.string().describe("The question string"),
  answer: z
    .string()
    .describe("The answer to the question, can be a single word or a sentence"),
  option1: z.string().describe("The first option for the question"),
  option2: z.string().describe("The second option for the question"),
  option3: z.string().describe("The third option for the question"),
});

export async function POST(req: Request) {
  console.log("Calling the POST route");

  try {
    const body = await req.json();
    const { topic, numberOfQuestions } = body;

    console.log(topic);

    let questions = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const result = await generateObject({
        model: google("models/gemini-1.5-pro-latest"),
        prompt: `You are an intelligent educator and very proficient in generating questions for various exams! Please generate a unique MCQ question for this topic: "${topic}". Ensure that each question is distinct from others. The answer and options can be single words or sentences. Here is question number ${
          i + 1
        }:`,
        schema: questionSchema,
      });

      questions.push(result.object);
    }

    console.log(questions);

    return NextResponse.json(
      {
        result: questions,
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
