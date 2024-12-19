import db from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import EditExamFormCard from "@/components/forms/EditExamFormCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BulkUploadQuestionsDialog from "@/components/BulkUploadQuestionsDialog";
import { Suspense } from "react";
import ExamDetailCardSkeleton from "@/components/skeletons/ExamDetailCardSkeleton";
import TipTapEditor from "@/components/tiptap-editor";
import PreviousPageButton from "@/components/PreviousPageButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HtmlContent from "@/components/html-content";
import ExamDetails from "./ExamDetails";

export default async function Page(props: {
  params: Promise<{
    examId: string;
  }>;
}) {
  const params = await props.params;
  const { examId } = params;

  return (
    <section className="mx-auto block-space container">
      <div className="flex gap-4 items-center mb-6 md:mb-8 ">
        <PreviousPageButton />
        <BulkUploadQuestionsDialog examId={examId} />
      </div>

      <Suspense fallback={<ExamDetailCardSkeleton />}>
        <ExamDetails examId={examId} />
      </Suspense>
    </section>
  );
}
