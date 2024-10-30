import BulkUploadQuestionsDialog from "@/components/BulkUploadQuestionsDialog";
import BulkUploadQuestionsButton from "@/components/forms/BulkUploadQuestionsButton";
import AddNewQuestionForm from "@/components/forms/new-question-form";
import React from "react";

const AddNewQuestionPage = async ({
  params,
}: {
  params: {
    examId: string;
    questionId: string;
  };
}) => {
  const { examId, questionId } = params;

  return (
    <section className="block-space narrow-container">
      <div className="flex justify-between mb-6 md:mb-12">
        <h3>Add a New Question for this Exam</h3>
        <BulkUploadQuestionsDialog examId={examId} />
      </div>
      <AddNewQuestionForm examId={examId} />
    </section>
  );
};

export default AddNewQuestionPage;
