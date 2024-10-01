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
import { Button } from "@/components/ui/button";
import Link from "next/link";

import ClientQuestionTable from "./ClientQuestionTable";
import BulkUploadQuestionsDialog from "@/components/BulkUploadQuestionsDialog";

export default async function Page({
  params,
}: {
  params: {
    examId: string;
    examSlug: string;
  };
}) {
  const { examId, examSlug } = params;

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
    include: {
      options: true,
      correctAnswers: true,
    },
  });

  console.log("questions are", questions);

  const { id, slug, timeAllowed, attempts, examLevel, name, vendor } =
    currentExam;

  return (
    <section className="mx-auto block-space">
      <div className="flex gap-4 items-center mb-6 md:mb-8 ">
        <Button asChild className="mr-4">
          <Link href={`/exam/${id}/${slug}/generate-questions`}>
            Generate Questions
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/vendor/${vendor.slug}`}>Back to All Exams</Link>
        </Button>
        <BulkUploadQuestionsDialog examId={id} />
      </div>

      <div className="text-center mb-12">
        <h1>{name}</h1>
        <h2>Total Questions:- {questions.length}</h2>
      </div>
      <div className="mb-12 narrow-container">
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              This form is prefilled with details of your exam, make changes and
              click save button to apply them to the exam
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
                Vendor Name
              </div>
              <div className="font-semibold">{vendor.name}</div>
            </div>
          </CardContent>
          <CardFooter>
            <EditExamFormCard
              examId={id}
              examSlug={slug}
              ExamLevel={examLevel}
              topic={name}
              numberOfAttempts={attempts}
              timeAllowed={timeAllowed}
            />
          </CardFooter>
        </Card>
      </div>
      <div>
        <h3 className="text-center">Questions of {name}:-</h3>
        <ClientQuestionTable data={questions} examId={params.examId} />
      </div>
    </section>
  );
}
