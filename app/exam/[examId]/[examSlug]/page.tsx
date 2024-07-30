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

export default async function Page({
  params,
}: {
  params: {
    examId: string;
    examSlug: string;
  };
}) {
  const currentExam = await db.exam.findUnique({
    where: {
      id: params.examId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
          options: true,
        },
      },
      examType: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!currentExam) {
    return notFound();
  }

  const {
    id,
    name,
    slug,
    timeAllowed,
    questions,
    attempts,
    examLevel,
    examType,
    updatedAt,
  } = currentExam;

  const formattedDate = format(new Date(updatedAt), "dd MMMM yyyy");

  let transformedData = questions.map((question) => {
    const options = JSON.parse(question.options as string);

    return {
      id: question.id,
      question: question.question,
      answer: question.answer,
      option1: options[0].option1,
      option2: options[1].option2,
      option3: options[2].option3,
      option4: options[3].option4,
    };
  });

  console.log("transformed data is", transformedData);

  return (
    <section className="mx-auto block-space">
      <div className="absolute top-10 left-12">
        <Button asChild>
          <Link href={`/exam/${id}/${slug}/generate-questions`}>
            Generate Questions
          </Link>
        </Button>
      </div>
      <div className="text-center mb-12">
        <h1>{name}</h1>
      </div>
      <div className="mb-12 narrow-container">
        <span className="text-muted-foreground block font-semibold mb-2">
          Last Updated: {formattedDate}
        </span>
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
              <div className="font-semibold">{examType.name}</div>
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
        <ClientQuestionTable data={transformedData} examId={params.examId} />
      </div>
    </section>
  );
}
