"use server";

import db from "@/lib/db";
import {
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "../schemas/CreateExamSchema";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { stripe } from "@/lib/stripe";

const EditExam = async (
  examId: string,
  examSlug: string,
  values: CreateExamFormZodType,
  stripePriceId: string,
  stripeProductId: string
) => {
  try {
    const validatedFields = CreateExamFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "send valid data",
      };
    }

    const {
      topic,
      ExamLevel,
      timeAllowed,
      numberOfAttempts,
      price,
      questionsToShow,
      description,
    } = validatedFields.data;

    // generating a new slug for the exam if the name was changed
    const updatedSlug = slugify(topic, {
      lower: true,
    });

    console.log("editing exam.....");
    console.log("stripe PriceId", stripePriceId);
    console.log("stripe ProductId", stripeProductId);

    await stripe.products.update(stripeProductId, {
      name: topic,
      description: description || "No description provided.",
    });

    const currentPrice = await stripe.prices.retrieve(stripePriceId);
    const priceInCents = Math.round(price * 100);

    if (currentPrice.unit_amount !== priceInCents) {
      // Deactivate the current price
      await stripe.prices.update(stripePriceId, { active: false });

      // Create a new price in Stripe for the updated amount
      const newPrice = await stripe.prices.create({
        unit_amount: priceInCents, // Stripe uses the smallest currency unit (e.g., cents)
        currency: "usd", // Adjust this if you use other currencies
        product: stripeProductId,
        billing_scheme: "per_unit",
      });
    }

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
        price,
        description,
        questionsToShow,
      },
    });

    revalidatePath(`/exam/${examId}/${examSlug}`);

    return {
      success: "successfully Edited Exam and in the stripe dashboard as well",
    };
  } catch (error) {
    console.log("an error occured while trying to edit prices", error);

    if (error instanceof ZodError) {
      return {
        error: "Please send a valid schema values",
      };
    }

    return {
      error: `Could not delete Exam Vendor ${error}`,
    };
  }
};

export default EditExam;
