import EditQuestionForm from "@/components/forms/edit-question-form";
import HtmlContent from "@/components/html-content";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import QuestionDetailSkeleton from "@/components/skeletons/QuestionDetailSkeleton";
import TipTapEditor from "@/components/tiptap-editor";
import db from "@/lib/db";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

const SpecificQuestionPage = async ({
  params,
}: {
  params: {
    examId: string;
    questionId: string;
  };
}) => {
  const { examId, questionId } = params;

  const SpecificQuestion = await db.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!SpecificQuestion) {
    return (
      <div>
        <h2>Could not find Question</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  const { id, question } = SpecificQuestion;

  return (
    <section className="block-space narrow-container">
      <div className="mb-8 space-y-4">
        <h2>Edit Question</h2>
        <HtmlContent content={question} />
      </div>
      <div>
        <EditQuestionForm SingleQuestion={SpecificQuestion} examId={examId} />
      </div>
    </section>
  );
};

export default SpecificQuestionPage;
