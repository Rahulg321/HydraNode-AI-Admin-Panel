"use server";

import { ZodError } from "zod";
import {
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "../schemas/CreateExamSchema";
import db from "@/lib/db";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";

const createExam = async (values: CreateExamFormZodType, vendorId: string) => {
  try {
    // validate fields on the server
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

    const slugValue = slugify(topic, {
      lower: true,
    });

    const stripeProduct = await stripe.products.create({
      name: topic,
      description: description || "An exam created on the platform",
      metadata: {
        vendorId,
        examId: ExamLevel,
      },
    });

    // Optionally create a price for the Stripe product if you charge for the exam
    const stripePrice = await stripe.prices.create({
      unit_amount: price * 100, // Stripe works with the smallest currency unit (e.g., cents)
      currency: "usd",
      product: stripeProduct.id,
      billing_scheme: "per_unit",
    });

    console.log("created stripe product for this exam");
    console.log("stripe product", stripeProduct);
    console.log("stripe price", stripePrice);

    await db.exam.create({
      data: {
        name: topic,
        slug: slugValue,
        examLevel: ExamLevel,
        attempts: numberOfAttempts,
        vendorId,
        timeAllowed,
        price,
        questionsToShow,
        description,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      },
    });

    revalidatePath(`vendors/${vendorId}`);

    return {
      success: "successfully created exam and corresponding product in stripe",
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
