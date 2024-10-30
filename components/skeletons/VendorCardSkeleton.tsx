import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VendorCardSkeleton = () => {
  return (
    <Card className="">
      <CardHeader className="relative rounded-b-md">
        <Skeleton className="w-[150px] h-[20px] rounded-md mb-2" />{" "}
        {/* Skeleton for vendor name */}
        <Skeleton className="w-[100px] h-[20px] rounded-full mb-4" />{" "}
        {/* Skeleton for description */}
        <Skeleton className="w-[80px] h-[20px] rounded-md" />{" "}
        {/* Skeleton for delete button */}
      </CardHeader>
      <CardContent className="p-4">
        {/* Add any additional content skeletons if needed */}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Skeleton className="w-full h-[40px] rounded-md" />{" "}
        {/* Skeleton for button */}
      </CardFooter>
    </Card>
  );
};

export default VendorCardSkeleton;
