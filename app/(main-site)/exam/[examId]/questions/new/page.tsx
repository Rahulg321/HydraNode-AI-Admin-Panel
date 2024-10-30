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
      <h3>Add a New Question for this Exam</h3>
      <AddNewQuestionForm examId={examId} />
    </section>
  );
};

export default AddNewQuestionPage;
