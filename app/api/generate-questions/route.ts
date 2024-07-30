import { GenerateQuestionFormSchema } from "@/app/schemas/GenerateQuestionFormSchema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const MCQ_QUESTION_SCHEMA = z.object({
  id: z
    .string()
    .describe(
      "Unique identifier for the question, make the sure that no two ids are macthing and always use a uuid algorithm for the same"
    ),
  question: z.string().describe("The question string"),
  answer: z.string().describe("Answer with max length of 15 words"),
  option1: z.string().describe("option 1 with max length of 15 words"),
  option2: z.string().describe("option 2 with max length of 15 words"),
  option3: z.string().describe("option 3 with max length of 15 words"),
  option4: z.string().describe("option 4 with max length of 15 words"),
});

export async function GET(req: Request) {
  console.log("Calling the GET route");
  return NextResponse.json({
    status: 200,
  });
}

export async function POST(req: Request) {
  console.log("Calling the POST route");

  try {
    const body = await req.json();
    const { numberOfQuestions, topic, difficulty } =
      GenerateQuestionFormSchema.parse(body.values);

    let questions: any = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const result = await generateObject({
        model: google("models/gemini-1.5-pro-latest"),
        seed: 1,
        prompt: `You are an helpful AI that is able to generate mcq questions and answers, the length of each answer should not exceed 15 words, store all the pairs of questions and answers in an JSON array. You are to generate a random ${difficulty} question about the topic ${topic}. Make sure that each question generated is unique and different from each other.`,
        schema: MCQ_QUESTION_SCHEMA,
      });
      questions.push(result.object);
    }

    return NextResponse.json(
      {
        questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("error while generating questions", error);
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }

    console.log("error while generating questions", error);

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
