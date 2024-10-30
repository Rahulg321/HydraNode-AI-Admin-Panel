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

export default async function Page({
  params,
}: {
  params: {
    examId: string;
  };
}) {
  const { examId } = params;

  return (
    <section className="mx-auto block-space container">
      <div className="flex gap-4 items-center mb-6 md:mb-8 ">
        <PreviousPageButton />
        <BulkUploadQuestionsDialog examId={examId} />
      </div>

      <Suspense
        fallback={
          <div className="narrow-container">
            <ExamDetailCardSkeleton />
          </div>
        }
      >
        <FetchExamCardDetails examId={examId} />
      </Suspense>
    </section>
  );
}

async function FetchExamCardDetails({ examId }: { examId: string }) {
  const currentExam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    include: {
      vendor: true,
    },
  });

  if (!currentExam) {
    return notFound();
  }

  const questions = await db.question.findMany({
    where: {
      examId: examId,
    },
  });

  const {
    id,
    slug,
    timeAllowed,
    attempts,
    examLevel,
    name,
    vendor,
    price,
    questionsToShow,
    description,
    stripePriceId,
    stripeProductId,
  } = currentExam;

  return (
    <>
      <div className="text-center mb-12">
        <h1>{name}</h1>
        <h2>Total Questions:- {questions.length}</h2>
      </div>
      <div className="mb-12 narrow-container">
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {description || "No description available"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <div className="text-muted-foreground font-semibold">
                Attempts Allowed
              </div>
              <div className="font-semibold">{attempts}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground font-semibold">
                Time Allowed
              </div>
              <div className="font-semibold">{timeAllowed} minutes</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground font-semibold">
                Difficulty Level
              </div>
              <div className="font-semibold">{examLevel}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground font-semibold">
                Exam Price
              </div>
              <div className="font-semibold">{price}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground font-semibold">
                Questions To Show
              </div>
              <div className="font-semibold">{questionsToShow}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground font-semibold">
                Vendor Name
              </div>
              <div className="font-semibold">{vendor.name}</div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <EditExamFormCard
              examId={id}
              examSlug={slug}
              ExamLevel={examLevel}
              topic={name}
              numberOfAttempts={attempts}
              timeAllowed={timeAllowed}
              price={price}
              stripePriceId={stripePriceId!}
              stripeProductId={stripeProductId!}
              questionsToShow={questionsToShow}
              description={description ? description : ""}
            />

            <Button asChild>
              <Link href={`/exam/${examId}/questions`}>View Questions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
