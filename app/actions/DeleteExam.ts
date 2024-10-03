"use server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

const deleteExam = async (
  examId: string,
  examTypeSlug: string,
  stripeProductId: string
) => {
  try {
    // before deleting a product from stripe first delete all its associated prices
    const prices = await stripe.prices.list({
      product: stripeProductId,
    });

    for (const price of prices.data) {
      await stripe.prices.update(price.id, { active: false }); // Optionally deactivate first
      // await stripe.prices.del(price.id);
    }

    await stripe.products.update(stripeProductId, { active: false });

    // stripe discourages to delete using the api in order to maintain complete log
    // const deletedProduct = await stripe.products.del(stripeProductId);

    // if (deletedProduct.deleted) {
    //   console.log("successfully deleted product from stripe");
    // } else {
    //   throw Error("Could not delete product from stripe");
    // }

    await db.exam.delete({
      where: {
        id: examId,
      },
    });

    revalidatePath(`/examType/${examTypeSlug}`);

    return {
      success:
        "successfully deleted Exam Vendor and deactivated exam in stripe",
    };
  } catch (error: any) {
    console.error("am error occured while deleting exam", error);
    return {
      error: `Could not delete Exam Vendor ${error.message}`,
    };
  }
};

export default deleteExam;
