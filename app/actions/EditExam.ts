"use server";

import db from "@/lib/db";
import {
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "../schemas/CreateExamSchema";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";

const EditExam = async (
  examId: string,
  examSlug: string,
  values: CreateExamFormZodType
) => {
  try {
    const validatedFields = CreateExamFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "send valid data",
      };
    }

    const { topic, ExamLevel, timeAllowed, numberOfAttempts } =
      validatedFields.data;

    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        name: topic,
        examLevel: ExamLevel,
        attempts: numberOfAttempts,
        timeAllowed,
      },
    });

    revalidatePath(`/exam/${examSlug}`);

    return {
      success: "successfully deleted Exam Vendor",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return {
        error: "Please send a valid schema values",
      };
    }
    console.log(error);
    return {
      error: "Could not delete Exam Vendor",
    };
  }
};

export default EditExam;
