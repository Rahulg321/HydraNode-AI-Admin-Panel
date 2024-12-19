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
import { Suspense } from "react";
import VendorCardSkeleton from "@/components/skeletons/VendorCardSkeleton";

export default async function VendorsPage() {
  return (
    <section className="block-space container">
      <div className="text-center space-y-2 mb-12">
        <h1>Vendors</h1>
      </div>
      <div className="mb-4">
        <CreateExamTypeDialog />
      </div>
      <div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <VendorCardSkeleton />
              <VendorCardSkeleton />
              <VendorCardSkeleton />
              <VendorCardSkeleton />
              <VendorCardSkeleton />
              <VendorCardSkeleton />
              <VendorCardSkeleton />
            </div>
          }
        >
          <VendorsSection />
        </Suspense>
      </div>
    </section>
  );
}

const VendorsSection = async () => {
  const vendors = await db.vendor.findMany();

  if (!vendors || vendors.length === 0) {
    return (
      <div>
        <p>No vendors found</p>
        <p>Please add a new vendor</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <li key={vendor.id}>
            <ExamTypeCard vendor={vendor} />
          </li>
        ))}
      </ul>
    </div>
  );
};

async function ExamTypeCard({ vendor }: { vendor: Vendor }) {
  const formattedDate = format(new Date(vendor.updatedAt), "dd MMMM yyyy");
  return (
    <Card className="">
      <CardHeader className="relative rounded-b-md">
        <CardTitle>{vendor.name}</CardTitle>
        <CardDescription className="font-semibold"></CardDescription>
        <DeleteExamVendorButton vendorId={vendor.id} />
      </CardHeader>
      <CardContent className="p-4"></CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" asChild>
          <Link href={`/vendors/${vendor.id}`}>
            View Details <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
