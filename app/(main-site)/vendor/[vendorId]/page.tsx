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
import PreviousPageButton from "@/components/PreviousPageButton";
import {
  BookOpenIcon,
  CalendarIcon,
  Clock10Icon,
  DollarSignIcon,
  FileTextIcon,
  LayersIcon,
  Repeat1Icon,
} from "lucide-react";

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
      <div className="flex items-center gap-4">
        <PreviousPageButton />
        <CreateExamDialog vendor={vendor} />
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
      <CardHeader className="relative rounded-b-md">
        <CardTitle className="font-bold">{exam.name}</CardTitle>
        <CardDescription>{exam.description}</CardDescription>
        <div className="absolute top-2 right-2">
          <DeleteExamDialog
            examTypeSlug={vendorSlug}
            examId={exam.id}
            examName={exam.name}
            stripeProductId={exam.stripeProductId!}
          />
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-4">
          {/* Exam Price */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-muted-foreground font-semibold">
              <DollarSignIcon className="w-5 h-5" />
              <span>Exam Price</span>
            </div>
            <div className="font-semibold">${exam.price}</div>
          </div>

          {/* Questions to Show */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-muted-foreground font-semibold">
              <FileTextIcon className="w-5 h-5" />
              <span>Questions to Show</span>
            </div>
            <div className="font-semibold">{exam.questionsToShow}</div>
          </div>

          {/* Total Time Allowed */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-muted-foreground font-semibold">
              <Clock10Icon className="w-5 h-5" />
              <span>Total Time Allowed</span>
            </div>
            <div className="font-semibold">{exam.timeAllowed} minutes</div>
          </div>

          {/* Exam Level */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-muted-foreground font-semibold">
              <LayersIcon className="w-5 h-5" />
              <span>Exam Level</span>
            </div>
            <div className="font-semibold">{exam.examLevel}</div>
          </div>

          {/* Available Attempts */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-muted-foreground font-semibold">
              <Repeat1Icon className="w-5 h-5" />
              <span>Available Attempts</span>
            </div>
            <div className="font-semibold">{exam.attempts}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" asChild>
          <Link href={`/exam/${exam.id}/${exam.slug}`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
