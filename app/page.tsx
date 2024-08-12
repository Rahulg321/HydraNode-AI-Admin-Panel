import { ModeToggle } from "@/components/mode-toggle";
import { format } from "date-fns";
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
import { Vendor } from "@prisma/client";

export default async function Home() {
  const vendors = await db.vendor.findMany();

  return (
    <section className="block-space">
      <div className="text-center space-y-2 mb-12">
        <h1>
          Hydra Node{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Admin Panel
          </span>
        </h1>
        <h2>All Exam Types are {vendors.length}</h2>
      </div>
      <div className="absolute top-10 left-12">
        <CreateExamTypeDialog />
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <li key={vendor.id}>
            <ExamTypeCard vendor={vendor} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExamTypeCard({ vendor }: { vendor: Vendor }) {
  const formattedDate = format(new Date(vendor.updatedAt), "dd MMMM yyyy");
  return (
    <Card>
      <CardHeader className="relative bg-muted rounded-b-md">
        <CardTitle>{vendor.name}</CardTitle>
        <CardDescription className="font-semibold">
          Updated At: {formattedDate}
        </CardDescription>
        <DeleteExamVendorButton vendorId={vendor.id} />
      </CardHeader>
      <CardContent className="p-4">
        <h5 className="font-bold">Exam Details</h5>
        <Separator className="mb-4 mt-2" />
        <div className="space-y-3">
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
          <Link href={`/vendor/${vendor.slug}`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
