"use server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, JSONParseError, TypeValidationError } from "ai";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid"; // Import the UUID package
import exp from "constants";
import { GenerateQuestionZodType } from "../../src/app/schemas/GenerateQuestionFormSchema";

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

const GenerateQuestions = async (values: GenerateQuestionZodType) => {
  const { topic, description, difficulty, numberOfQuestions } = values;

  try {
    let questions = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const result = await generateObject({
        model: openai("gpt-4-turbo"),
        temperature: 0.9,
        prompt: `You are a helpful AI assistant that is able to generate mcq questions and answers. The length of each answer should not exceed 15 words. Store all the pairs of questions and answers in a JSON array. You are to generate a random ${difficulty} question about the topic ${topic} with the additional description ${description}. Make sure that each question generated is unique and different from each other.`,
        schema: MCQ_QUESTION_SCHEMA,
      });

      const questionWithId = {
        ...result.object,
        id: uuidv4(), // Assign a unique UUID
      };

      console.log("Question generated in each loop:", questionWithId);
      questions.push(questionWithId);
    }

    console.log("Generated questions are:", questions);

    // Return a native Response object
    return {
      success: "successfully generated questions",
      questions,
    };
  } catch (error) {
    console.error(error);

    if (TypeValidationError.isTypeValidationError(error)) {
      return {
        error: error.message,
      };
    } else if (JSONParseError.isJSONParseError(error)) {
      return {
        error: error.message + error.text,
      };
    } else {
      return {
        error: "An error occurred while generating questions",
      };
    }
  }
};

export default GenerateQuestions;
