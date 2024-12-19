"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Deletes a single question from the database by its question ID.
 *
 * This asynchronous function interacts with the database to delete a specific question
 * associated with an exam. It uses Prisma's delete method to remove the question from the database
 * and then revalidates the path of the exam page to ensure updated data is displayed to the user.
 *
 * @param {string} questionId - The unique identifier of the question to be deleted.
 * @param {string} examId - The unique identifier of the exam that contains the question.
 *
 * @returns {Promise<{type:"success";message:""}>} - A promise that resolves to an object
 * indicating the success or failure of the deletion operation. If successful, returns a message
 * stating the question was deleted; otherwise, returns an error message.
 *
 * @example
 * const result = await deleteSingleQuestion("question123", "exam456");
 * if (result.success) {
 *   console.log(result.success);
 * } else {
 *   console.log(result.error);
 * }
 */
const deleteSingleQuestion = async (questionId: string, examId: string) => {
  try {
    if (!questionId || !examId) {
      return {
        type: "error",
        message: "Invalid question or exam ID",
      };
    }

    await db.question.delete({
      where: {
        id: questionId,
      },
    });

    revalidatePath(`/exam/${examId}/questions`);

    return {
      type: "success",
      message: "successfully deleted question",
    };
  } catch (error) {
    console.log("error while deleting question", error);
    return {
      type: "error",
      message: "Could not delete question",
    };
  }
};
export default deleteSingleQuestion;
