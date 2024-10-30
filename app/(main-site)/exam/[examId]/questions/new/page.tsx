import AddNewQuestionForm from "@/components/forms/new-question-form";
import React from "react";

const AddNewQuestionPage = async () => {
  return (
    <section className="block-space big-container">
      <h3>Add a New Question for this Exam</h3>
      <AddNewQuestionForm />
    </section>
  );
};

export default AddNewQuestionPage;
