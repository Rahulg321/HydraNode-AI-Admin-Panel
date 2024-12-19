"use server";

import { NewQuestionFormZodType } from "@/components/forms/new-question-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function addNewQuestion(
  newQuestion: NewQuestionFormZodType,
  examId: string
) {
  try {
    if (!newQuestion || !examId) {
      return {
        type: "error",
        message:
          "please provide a valid question object or examId, server side error occurred",
      };
    }

    const {
      question,
      answerOption1,
      answerOption2,
      answerOption3,
      answerOption4,
      answerOption5,
      answerOption6,
      explanation1,
      explanation2,
      explanation3,
      explanation4,
      explanation5,
      explanation6,
      correctAnswers,
      overallExplanation,
      questionType,
      domain,
    } = newQuestion;

    const response = await db.question.create({
      data: {
        question: question,
        examId: examId,
        questionType,
        answerOption1,
        answerOption2,
        answerOption3,
        answerOption4,
        answerOption5,
        answerOption6,
        explanation1: explanation1 || "",
        explanation2: explanation2 || "",
        explanation3: explanation3 || "",
        explanation4: explanation4 || "",
        explanation5,
        explanation6,
        correctAnswers,
        domain,
        overallExplanation: overallExplanation || "",
      },
    });

    revalidatePath(`/exam/${examId}/questions`);

    return {
      type: "success",
      message: "Question added successfully",
      questionId: response.id,
    };
  } catch (error) {
    console.log("error adding new question", error);
    return {
      type: "error",
      message: "Error adding new question",
    };
  }
}
