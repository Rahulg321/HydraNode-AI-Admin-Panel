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
        error: "Please send valid data",
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

    // Generate a new slug for the exam if the name was changed
    const updatedSlug = slugify(topic, {
      lower: true,
    });

    console.log("Editing exam...");
    console.log("Stripe PriceId:", stripePriceId);
    console.log("Stripe ProductId:", stripeProductId);

    // Update the Stripe product with the new exam name/description
    await stripe.products.update(stripeProductId, {
      name: topic,
      description: description || "No description provided.",
    });

    const currentPrice = await stripe.prices.retrieve(stripePriceId);
    const priceInCents = Math.round(price * 100);

    // Check if the price has changed before updating
    if (currentPrice.unit_amount !== priceInCents) {
      // Deactivate the current price
      await stripe.prices.update(stripePriceId, { active: false });

      // Create a new price in Stripe for the updated amount
      const newPrice = await stripe.prices.create({
        unit_amount: priceInCents,
        currency: "usd", // Adjust if needed
        product: stripeProductId,
        billing_scheme: "per_unit",
      });

      // Update the database with the new Stripe price ID
      await db.exam.update({
        where: {
          id: examId,
        },
        data: {
          stripePriceId: newPrice.id,
          price,
        },
      });
    }

    // Update the exam details in the database
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
        description,
        questionsToShow,
      },
    });

    // Revalidate the path once after all updates are done
    revalidatePath(`/exam/${examId}`);

    return {
      success:
        "Successfully edited exam and updated in Stripe dashboard as well.",
    };
  } catch (error: any) {
    console.error("An error occurred while trying to edit the exam:", error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return {
        error: "Please send valid schema values",
      };
    }

    // Handle Stripe-specific errors
    if (error instanceof stripe.errors.StripeError) {
      return {
        error: `Stripe error: ${error.message}`,
      };
    }

    // General error handler
    return {
      error: `An unexpected error occurred: ${error.message}`,
    };
  }
};

export default EditExam;
