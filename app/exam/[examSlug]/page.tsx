import db from "@/lib/db";
import { Question, columns } from "./columns";
import { DataTable } from "./data-table";
import { notFound } from "next/navigation";
import GenerateQuestionsDialog from "@/components/GenerateQuestionsDialog";
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
import { Separator } from "@/components/ui/separator";

export const quizQuestions = [
  {
    id: "728ed52f",
    question:
      "What is the command-line interface for interacting with Google Cloud Platform services called?",
    answer: "Cloud SDK",
    option1: "Azure CLI",
    option2: "Cloud SDK",
    option3: "AWS CLI",
  },
  {
    id: "1d4b8a3c",
    question: "Which language is primarily used for Android app development?",
    answer: "Java",
    option1: "Swift",
    option2: "Kotlin",
    option3: "Java",
  },
  {
    id: "f0a2c8d7",
    question: "What is the name of the default package manager for Node.js?",
    answer: "npm",
    option1: "pip",
    option2: "npm",
    option3: "yarn",
  },
  {
    id: "4f7a1e6b",
    question: "Which HTML tag is used to define an unordered list?",
    answer: "<ul>",
    option1: "<ol>",
    option2: "<li>",
    option3: "<ul>",
  },
  {
    id: "b3d4e9c1",
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    option1: "Creative Style Sheets",
    option2: "Colorful Style Sheets",
    option3: "Cascading Style Sheets",
  },
  {
    id: "2e5c7d9a",
    question: "Which company developed the React framework?",
    answer: "Facebook",
    option1: "Google",
    option2: "Facebook",
    option3: "Microsoft",
  },
  {
    id: "8c3f1d5e",
    question: "What is the purpose of the Git command `git commit`?",
    answer: "Record changes to the repository",
    option1: "Create a new branch",
    option2: "Record changes to the repository",
    option3: "Push changes to the remote repository",
  },
  {
    id: "5a7e2c9d",
    question: "What is the file extension for a Python file?",
    answer: ".py",
    option1: ".js",
    option2: ".java",
    option3: ".py",
  },
  {
    id: "6d8f3e1b",
    question:
      "Which protocol is used to secure communications over the Internet?",
    answer: "HTTPS",
    option1: "FTP",
    option2: "HTTP",
    option3: "HTTPS",
  },
  {
    id: "9a1b4c3f",
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    option1: "Simple Query Language",
    option2: "Structured Query Language",
    option3: "Standard Query Language",
  },
  {
    id: "c3d6e2f8",
    question: "In CSS, which property is used to change the text color?",
    answer: "color",
    option1: "text-color",
    option2: "font-color",
    option3: "color",
  },
  {
    id: "1e7b9d5a",
    question: "Which HTTP method is used to retrieve data from a server?",
    answer: "GET",
    option1: "POST",
    option2: "GET",
    option3: "DELETE",
  },
  {
    id: "4b6f2c1a",
    question: "What is the default port for HTTP?",
    answer: "80",
    option1: "443",
    option2: "80",
    option3: "8080",
  },
  {
    id: "7c5d8e3f",
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    answer: "Stack",
    option1: "Queue",
    option2: "Stack",
    option3: "List",
  },
];

export default async function Page({
  params,
}: {
  params: {
    examSlug: string;
  };
}) {
  const currentExam = await db.exam.findUnique({
    where: {
      slug: params.examSlug,
    },
    include: {
      questions: true,
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

  return (
    <section className="mx-auto block-space">
      <div className="absolute top-10 left-12">
        <GenerateQuestionsDialog />
      </div>
      <div className="text-center mb-12">
        <h1>{name} Exam</h1>
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
        <DataTable columns={columns} data={quizQuestions} />
      </div>
    </section>
  );
}
