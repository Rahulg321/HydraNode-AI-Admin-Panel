import CreateExamDialog from "@/components/CreateExamDialog";
import db from "@/lib/db";
import React from "react";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import DeleteExamVendorButton from "@/components/DeleteExamVendorButton";
import DeleteExamDialog from "@/components/DeleteExamDialog";

const page = async ({
  params,
}: {
  params: {
    examId: string;
  };
}) => {
  const examType = await db.examType.findUnique({
    where: {
      slug: params.examId,
    },
    include: {
      exams: true,
    },
  });

  if (!examType) {
    return notFound();
  }

  return (
    <section className="block-space">
      <div className="absolute top-8 left-12">
        <CreateExamDialog />
      </div>
      <div className="text-center mb-12">
        <h1>{examType?.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExamCard />
        <ExamCard />
        <ExamCard />
        <ExamCard />
      </div>
    </section>
  );
};

export default page;

function ExamCard() {
  return (
    <Card>
      <CardHeader className="relative bg-muted rounded-b-md">
        <CardTitle>dasdas</CardTitle>
        <CardDescription className="font-semibold">
          Updated At: adasdas
        </CardDescription>

        <div className="absolute top-2 right-2">
          <DeleteExamDialog />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h5 className="font-bold">Exam Details</h5>
        <Separator className="mb-4 mt-2" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Total Exams
            </div>
            <div className="font-semibold">asda</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Available Levels
            </div>
            <div className="font-semibold">3</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className=" w-full" asChild>
          <Link href={`/examType/`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
