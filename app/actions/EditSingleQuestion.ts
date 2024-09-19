// "use server";

// import db from "@/lib/db";
// import { Question } from "@/lib/types";
// import { revalidatePath } from "next/cache";

export default async function editSingleQuestion() {}

// const editSingleQuestion = async (values: Question, examId: string) => {
//   let option1 = values.option1;
//   let option2 = values.option2;
//   let option3 = values.option3;
//   let option4 = values.option4;
//   let options = [
//     {
//       option1,
//     },
//     {
//       option2,
//     },
//     {
//       option3,
//     },
//     {
//       option4,
//     },
//   ];
//   console.log("values", values);
//   console.log("options", options);

//   try {
//     await db.question.update({
//       where: {
//         id: values.id,
//       },
//       data: {
//         question: values.question,
//         answer: values.answer,
//         options: JSON.stringify(options),
//       },
//     });

//     revalidatePath(`/exam/${examId}/`);

//     return {
//       success: "successfully edited question",
//     };
//   } catch (error) {
//     console.log("error while editing question in server action", error);
//     return {
//       error: "Could not edit question",
//     };
//   }
// };
// export default editSingleQuestion;
