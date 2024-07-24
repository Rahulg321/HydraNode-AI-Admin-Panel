import { ModeToggle } from "@/components/mode-toggle";
import db from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  CheckIcon,
  ArrowTopRightIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import CreateExamTypeDialog from "@/components/CreateExamTypeDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DeleteExamVendorButton from "@/components/DeleteExamVendorButton";
import { ExamType } from "@prisma/client";

export default async function Home() {
  const examTypes = await db.examType.findMany();

  return (
    <section className="block-space">
      <div className="flex items-center justify-between mb-12">
        <h2>All Exam Types are {examTypes.length}</h2>
        <CreateExamTypeDialog />
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examTypes.map((examType) => (
          <li key={examType.id}>
            <ExamTypeCard examType={examType} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExamTypeCard({ examType }: { examType: ExamType }) {
  return (
    <Card>
      <CardHeader className="relative bg-muted rounded-b-md">
        <CardTitle>{examType.name}</CardTitle>
        <CardDescription>Created: 25 November, 2024</CardDescription>
        <DeleteExamVendorButton vendorId={examType.id} />
      </CardHeader>
      <CardContent className="p-4">
        <h5 className="font-bold">Exam Details</h5>
        <Separator className="mb-4 mt-2" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Time Available
            </div>
            <div className="font-semibold">45 minutes</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Total Questions
            </div>
            <div className="font-semibold">24</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground font-semibold">
              Total Attempts
            </div>
            <div className="font-semibold">1</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className=" w-full" asChild>
          <Link href={`/examType/${examType.slug}`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
