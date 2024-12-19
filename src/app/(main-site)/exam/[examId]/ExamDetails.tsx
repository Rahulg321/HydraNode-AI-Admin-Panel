import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import db from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HtmlContent from "@/components/html-content";

export default async function ExamDetails({ examId }: { examId: string }) {
  const currentExam = await db.exam.findUnique({
    where: { id: examId },
    include: { vendor: true },
  });

  if (!currentExam) return notFound();

  const questions = await db.question.findMany({
    where: { examId: examId },
  });

  const {
    name,
    description,
    attempts,
    timeAllowed,
    examLevel,
    price,
    questionsToShow,
    vendor,
  } = currentExam;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div className="prose max-w-none mb-4">
          <HtmlContent content={description || ""} />
        </div>
        <p className="text-xl font-semibold">
          Total Questions:{" "}
          <span className="text-primary">{questions.length}</span>
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{name} Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Difficulty Level", value: examLevel },
            { label: "Exam Price", value: price },
            { label: "Questions To Show", value: questionsToShow },
            { label: "Vendor Name", value: vendor.name },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href={`/exam/${examId}/manage/price`}>Manage Price</Link>
          </Button>
          <Button asChild>
            <Link href={`/exam/${examId}/manage/basics`}>
              Manage Exam Information
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/exam/${examId}/questions`}>View Questions</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
