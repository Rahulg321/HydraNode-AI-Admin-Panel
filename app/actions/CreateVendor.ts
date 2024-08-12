"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { ZodError } from "zod";
import {
  CreateVendorFormSchema,
  VendorFormZodType,
} from "../schemas/CreateVendorSchema";

export const createVendor = async (values: VendorFormZodType) => {
  try {
    const validatedFields = CreateVendorFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "send valid data",
      };
    }

    const { vendorName } = validatedFields.data;

    const vendorSlugValue = slugify(vendorName, {
      lower: true,
    });

    console.log("vendorName", vendorName);
    console.log("vendorSlugValue", vendorSlugValue);

    await db.vendor.create({
      data: {
        name: vendorName,
        slug: vendorSlugValue,
      },
    });

    revalidatePath("/");

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

    return {
      error: "Could not delete Exam Vendor",
    };
  }
};
