"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteExam = async (examId: string, examTypeSlug: string) => {
  try {
    await db.exam.delete({
      where: {
        id: examId,
      },
    });

    revalidatePath(`/examType/${examTypeSlug}`);

    return {
      success: "successfully deleted Exam Vendor",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Could not delete Exam Vendor",
    };
  }
};

export default deleteExam;
