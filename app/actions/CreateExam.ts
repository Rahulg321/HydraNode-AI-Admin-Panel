"use server";

import { ZodError } from "zod";
import {
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "../schemas/CreateExamSchema";
import db from "@/lib/db";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

const createExam = async (
  values: CreateExamFormZodType,
  examTypeId: string,
  examTypeSlug: string
) => {
  try {
    // validate fields on the server
    const validatedFields = CreateExamFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "send valid data",
      };
    }
    const { topic, ExamLevel, timeAllowed, numberOfAttempts } =
      validatedFields.data;

    const slugValue = slugify(topic, {
      lower: true,
    });

    await db.exam.create({
      data: {
        name: topic,
        slug: slugValue,
        examLevel: ExamLevel,
        attempts: numberOfAttempts,
        examTypeId,
        timeAllowed,
      },
    });

    revalidatePath(`examType/${examTypeSlug}`);

    return {
      success: "successfully created exam",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return {
        error: "Please send a valid schema values",
      };
    }
    return {
      error: "An error occurred while creating exam",
    };
  }
};

export default createExam;
