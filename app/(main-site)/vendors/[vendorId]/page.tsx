import CreateExamDialog from "@/components/CreateExamDialog";
import db from "@/lib/db";
import React, { Suspense } from "react";
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
import ExamCardSkeleton from "@/components/skeletons/ExamCardSkeleton";

const page = async ({
  params,
}: {
  params: {
    vendorId: string;
  };
}) => {
  const vendorId = params.vendorId;

  return (
    <section className="block-space container">
      <div className="flex items-center gap-4 mb-4">
        <PreviousPageButton />
        <CreateExamDialog vendorId={vendorId} />
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExamCardSkeleton />
            <ExamCardSkeleton />
            <ExamCardSkeleton />
            <ExamCardSkeleton />
            <ExamCardSkeleton />
            <ExamCardSkeleton />
          </div>
        }
      >
        <FetchExamCards vendorId={vendorId} />
      </Suspense>
    </section>
  );
};

export default page;

async function FetchExamCards({ vendorId }: { vendorId: string }) {
  // await for 3 sec
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const vendor = await db.vendor.findUnique({
    where: {
      id: vendorId,
    },
    include: {
      exams: true,
    },
  });

  if (!vendor) {
    return (
      <div>
        <h1>Could not find any vendors</h1>
        <Button asChild>
          <Link href={"/vendors"}>Try Again</Link>
        </Button>
      </div>
    );
  }

  if (vendor.exams.length === 0) {
    return (
      <div>
        <p>No exams found</p>
        <p>Please add a new exam</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1>{vendor?.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {vendor?.exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} vendorSlug={vendor.slug} />
        ))}
      </div>
    </div>
  );
}

function ExamCard({ exam, vendorSlug }: { exam: Exam; vendorSlug: string }) {
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
          <Link href={`/exam/${exam.id}`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
