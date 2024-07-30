"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteSingleQuestion = async (id: string) => {
  try {
    await db.question.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/exam/${id}`);

    return {
      success: "successfully deleted question",
    };
  } catch (error) {
    console.log("error while deleting question", error);
    return {
      error: "Could not delete question",
    };
  }
};
export default deleteSingleQuestion;
