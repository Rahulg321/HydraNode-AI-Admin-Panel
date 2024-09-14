"use server";

import db from "@/lib/db";
import { BaseQuestion, MCQQuestion, MultiSelectQuestion } from "@/lib/types";
import { QuestionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const bulkUploadQuestionsFromCSV = async (
  examId: string,
  parsedCSVQuestions: BaseQuestion[]
) => {
  console.log("parsedCSVQuestions are", parsedCSVQuestions);

  try {
    // Process each question from the CSV
    for (const question of parsedCSVQuestions) {
      // Initialize variables for common fields
      let questionString = question.question_text;
      let correctAnswers: string[] = [];
      let options: any[] = [];

      // Handle MCQ Question
      if (question.type === "MCQ") {
        const mcq = question as MCQQuestion;

        correctAnswers = [mcq.answer_1].filter(Boolean);

        options = [
          mcq.option_1 && {
            option: mcq.option_1,
            explanation: mcq.explanation_1,
          },
          mcq.option_2 && {
            option: mcq.option_2,
            explanation: mcq.explanation_2,
          },
          mcq.option_3 && {
            option: mcq.option_3,
            explanation: mcq.explanation_3,
          },
          mcq.option_4 && {
            option: mcq.option_4,
            explanation: mcq.explanation_4,
          },
        ].filter(Boolean); // Filter out any null or undefined options
      }
      // Handle Multi-Select Question
      else if (question.type === "multi-select") {
        const multiSelect = question as MultiSelectQuestion;

        // Prepare data for multi-select, filtering out null or empty values
        correctAnswers = [multiSelect.answer_1, multiSelect.answer_2].filter(
          Boolean
        );

        options = [
          multiSelect.option_1 && {
            option: multiSelect.option_1,
            explanation: multiSelect.explanation_1,
          },
          multiSelect.option_2 && {
            option: multiSelect.option_2,
            explanation: multiSelect.explanation_2,
          },
          multiSelect.option_3 && {
            option: multiSelect.option_3,
            explanation: multiSelect.explanation_3,
          },
          multiSelect.option_4 && {
            option: multiSelect.option_4,
            explanation: multiSelect.explanation_4,
          },
          multiSelect.option_5 && {
            option: multiSelect.option_5,
            explanation: multiSelect.explanation_5,
          },
          multiSelect.option_6 && {
            option: multiSelect.option_6,
            explanation: multiSelect.explanation_6,
          },
        ].filter(Boolean); // Filter out any null or undefined options
      }

      // If the question has no valid correct answers or options, skip it
      if (correctAnswers.length === 0 || options.length === 0) {
        continue;
      }

      console.log("options are", options);
      console.log("correctAnswers are", correctAnswers);

      // Create the question first
      const createdQuestion = await db.question.create({
        data: {
          question: questionString,
          type:
            question.type === "MCQ"
              ? QuestionType.MCQ
              : QuestionType.MULTI_SELECT,
          overallExplanation: question.overall_explanation,
          examId,
        },
      });

      // Insert options into the QuestionOption table
      for (const option of options) {
        await db.questionOption.create({
          data: {
            option: option.option,
            explanation: option.explanation,
            questionId: createdQuestion.id,
          },
        });
      }

      // Insert correct answers into the CorrectAnswer table
      for (const correctAnswer of correctAnswers) {
        await db.correctAnswer.create({
          data: {
            answer: correctAnswer, // Assuming answer corresponds to the option text
            questionId: createdQuestion.id,
          },
        });
      }
    }

    // Revalidate the exam page after bulk upload
    revalidatePath(`/exam/${examId}`);

    return {
      success: "Successfully saved questions",
    };
  } catch (error) {
    console.error("An error occurred while trying to save questions", error);
    return {
      error: "Could not save questions",
    };
  }
};
