"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

const BulkUploadQuestions = async (examId: string, sheetData: any) => {
  try {
    const mapCSVToSchema = (row: any) => ({
      question: row["Question"] || "", // Transform the column name
      questionType:
        row["Question Type"] === "multi-select"
          ? "multi_select"
          : "multiple_choice", // Convert type to match enum
      answerOption1: row["Answer Option 1"] || "",
      explanation1: row["Explanation 1"] || "",
      answerOption2: row["Answer Option 2"] || "",
      explanation2: row["Explanation 2"] || "",
      answerOption3: row["Answer Option 3"] || "",
      explanation3: row["Explanation 3"] || "",
      answerOption4: row["Answer Option 4"] || "",
      explanation4: row["Explanation 4"] || "",
      answerOption5: row["Answer Option 5"] || null, // Nullable field
      explanation5: row["Explanation 5"] || null,
      answerOption6: row["Answer Option 6"] || null,
      explanation6: row["Explanation 6"] || null,
      correctAnswers: row["Correct Answers"] || "",
      overallExplanation: row["Overall Explanation"] || "",
      domain: row["Domain"] || "",
      examId, // Attach the provided examId
    });

    // Map and clean the data
    const cleanedData = sheetData.map(mapCSVToSchema);

    console.log("cleaned data is", cleanedData);

    // Insert cleaned data in bulk
    await db.question.createMany({
      data: cleanedData,
      skipDuplicates: true, // Optional: skips entries with duplicate IDs
    });

    revalidatePath(`/exam/${examId}/questions`);
    revalidatePath(`/exam/${examId}/questions/new`);

    return {
      type: "success",
      message: `${cleanedData.length} questions uploaded successfully!`,
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: `error: ${error}`,
    };
  }
};

export default BulkUploadQuestions;
