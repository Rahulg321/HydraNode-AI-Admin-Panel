import EditQuestionForm from "@/components/forms/edit-question-form";
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

  return (
    <section className="block-space big-container">
      <Suspense
        fallback={
          <div>
            <QuestionDetailSkeleton />
          </div>
        }
      >
        <FetchQuestionDetails examId={examId} questionId={questionId} />
      </Suspense>
    </section>
  );
};

export default SpecificQuestionPage;

async function FetchQuestionDetails({
  examId,
  questionId,
}: {
  examId: string;
  questionId: string;
}) {
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
    <div className="">
      <h2 className="mb-4 md:mb-6">
        Edit Question:- <span className="italic">{question}</span>
      </h2>
      <div>
        <EditQuestionForm SingleQuestion={SpecificQuestion} />
      </div>
    </div>
  );
}
