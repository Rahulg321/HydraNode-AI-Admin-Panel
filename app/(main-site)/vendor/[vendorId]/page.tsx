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
import { Exam } from "@prisma/client";
import { format } from "date-fns";

const page = async ({
  params,
}: {
  params: {
    vendorId: string;
  };
}) => {
  const vendor = await db.vendor.findUnique({
    where: {
      slug: params.vendorId,
    },
    include: {
      exams: true,
    },
  });

  if (!vendor) {
    return notFound();
  }

  return (
    <section className="block-space">
      <div className="">
        <CreateExamDialog vendor={vendor} />
        <Button asChild className="ml-4">
          <Link href={`/`}>Back to Vendors</Link>
        </Button>
      </div>
      <div className="text-center mb-12">
        <h1>{vendor?.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {vendor?.exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} vendorSlug={vendor.slug} />
        ))}
      </div>
    </section>
  );
};

export default page;

function ExamCard({ exam, vendorSlug }: { exam: Exam; vendorSlug: string }) {
  const formattedDate = format(new Date(exam.updatedAt), "dd MMMM yyyy");
  return (
    <Card>
      <CardHeader className="relative bg-muted rounded-b-md">
        <CardTitle>{exam.name}</CardTitle>
        <CardDescription className="font-semibold">
          Last Updated At: {formattedDate}
        </CardDescription>

        <div className="absolute top-2 right-2">
          <DeleteExamDialog
            examTypeSlug={vendorSlug}
            examId={exam.id}
            examName={exam.name}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h5 className="font-bold">Exam Details</h5>
        <Separator className="mb-4 mt-2" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Total Time Allowed
            </div>
            <div className="font-semibold">{exam.timeAllowed}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Exam Level
            </div>
            <div className="font-semibold">{exam.examLevel}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Available Attempts
            </div>
            <div className="font-semibold">{exam.attempts}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className=" w-full" asChild>
          <Link href={`/exam/${exam.id}/${exam.slug}`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
