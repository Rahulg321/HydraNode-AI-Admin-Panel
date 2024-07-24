"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteExamVendor = async (id: string) => {
  try {
    await db.examType.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    return {
      success: "successfully deleted Exam Vendor",
    };
  } catch (error) {
    return {
      error: "Could not delete Exam Vendor",
    };
  }
};
