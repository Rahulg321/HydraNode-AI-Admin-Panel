"use server";

import db from "@/lib/db";
import {
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "../schemas/CreateExamSchema";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

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

    // generating a new slug for the exam if the name was changed
    const updatedSlug = slugify(topic, {
      lower: true,
    });

    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        name: topic,
        slug: updatedSlug,
        examLevel: ExamLevel,
        attempts: numberOfAttempts,
        timeAllowed,
      },
    });

    revalidatePath(`/exam/${examId}/${examSlug}`);

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
