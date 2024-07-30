"use server";

import db from "@/lib/db";
import { Question } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const saveExamQuestions = async (examId: string, questions: Question[]) => {
  try {
    let manyData = questions.map((question) => {
      let questionString = question.question;
      let answer = question.answer;
      let option1 = question.option1;
      let option2 = question.option2;
      let option3 = question.option3;
      let option4 = question.option4;

      let options = [
        {
          option1,
        },
        {
          option2,
        },
        {
          option3,
        },
        {
          option4,
        },
      ];

      return {
        question: questionString,
        answer,
        options: JSON.stringify(options),
        examId,
      };
    });

    await db.question.createMany({
      data: manyData,
    });

    revalidatePath(`/exam/${examId}`);

    return {
      success: "successfully saved questions",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Could not save questions",
    };
  }
};

export default saveExamQuestions;
