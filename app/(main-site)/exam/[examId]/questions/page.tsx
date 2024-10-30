import QuestionsSidebar from "@/components/questions-siderbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const ExamQuestionsPage = () => {
  return (
    <section className="block-space big-container">
      <h2 className="text-2xl font-semibold">
        Please select a question from the left sidebar to view and edit it.
      </h2>
      <p className="mt-4 text-gray-600">
        You can browse through the questions and make changes to each question
        as needed. Select any question from the sidebar to begin.
      </p>
    </section>
  );
};

export default ExamQuestionsPage;
