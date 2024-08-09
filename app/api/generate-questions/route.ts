import { GenerateQuestionFormSchema } from "@/app/schemas/GenerateQuestionFormSchema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, JSONParseError, TypeValidationError } from "ai";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { v4 as uuidv4 } from "uuid"; // Import the UUID package

const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: "sk-proj-1vWWtUHA9qsAvQWELMoBT3BlbkFJ3qDHvvCXekXMW8v1gSAU",
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

const MCQ_QUESTION_SCHEMA = z.object({
  question: z.string().describe("The question string"),
  answer: z.string().describe("Answer with max length of 15 words"),
  option1: z.string().describe("option 1 with max length of 15 words"),
  option2: z.string().describe("option 2 with max length of 15 words"),
  option3: z.string().describe("option 3 with max length of 15 words"),
  option4: z.string().describe("option 4 with max length of 15 words"),
});

type MCQ_QUESTIONS = z.infer<typeof MCQ_QUESTION_SCHEMA>;

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
    console.log("recieved body is ", body);
    // const { numberOfQuestions, topic, difficulty } =
    //   GenerateQuestionFormSchema.parse(body.values);
    const { numberOfQuestions, topic, difficulty, description } = body.values;
    console.log("numberOfQuestions is", numberOfQuestions);
    console.log("topic is", topic);
    console.log("difficulty is", difficulty);
    console.log("description is", description);

    let questions = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const result = await generateObject({
        model: openai("gpt-4-turbo"),
        temperature: 0.9,
        prompt: `You are an helpful AI assistant that is able to generate mcq questions and answers, the length of each answer should not exceed 15 words, store all the pairs of questions and answers in an JSON array. You are to generate a random ${difficulty} question about the topic ${topic} with the additional description ${description}. Make sure that each question generated is unique and different from each other.`,
        schema: MCQ_QUESTION_SCHEMA,
      });

      const questionWithId = {
        ...result.object,
        id: uuidv4(), // Assign a unique UUID
      };

      console.log("question generated each loop", questionWithId);
      questions.push(questionWithId);
    }

    console.log("generated questions are", questions);

    return NextResponse.json(
      {
        questions,
        type: "success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (TypeValidationError.isTypeValidationError(error)) {
      return { type: "validation-error", value: error.value };
    } else if (JSONParseError.isJSONParseError(error)) {
      return { type: "parse-error", text: error.text };
    } else {
      return { type: "unknown-error", error };
    }
  }
}
