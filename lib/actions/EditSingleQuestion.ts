"use server";

import db from "@/lib/db";
import { Question } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { EditQuestionZodType } from "../../src/app/schemas/EditQuestionSchema";
import { EditQuestionFormZodType } from "@/components/forms/edit-question-form";

export default async function editSingleQuestion(
  questionInstance: EditQuestionFormZodType,
  examId: string,
  questionId: string
) {
  try {
    if (!questionId || !questionInstance) {
      return {
        type: "error",
        message:
          "please provide a valid question id and question object, server side error",
      };
    }

    const response = await db.question.update({
      where: {
        id: questionId,
      },
      data: {
        ...questionInstance,
      },
    });

    revalidatePath(`/exam/${examId}/questions/${questionId}`);

    return {
      type: "success",
      message: "Question edited successfully",
    };
  } catch (error) {
    console.log("error editing question", error);
    return {
      type: "error",
      message: "Error editing question",
    };
  }
}
