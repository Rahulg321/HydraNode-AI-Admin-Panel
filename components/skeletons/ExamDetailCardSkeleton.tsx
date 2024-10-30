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

const ExamDetailCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-[150px] h-[24px] rounded-md mb-2" />{" "}
        {/* Skeleton for title */}
        <Skeleton className="w-full h-[20px] rounded-md mb-4" />{" "}
        {/* Skeleton for description */}
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Attempts Allowed */}
        <div className="flex justify-between">
          <Skeleton className="w-[130px] h-[20px] rounded-md" />{" "}
          {/* Label skeleton */}
          <Skeleton className="w-[60px] h-[20px] rounded-md" />{" "}
          {/* Value skeleton */}
        </div>

        {/* Time Allowed */}
        <div className="flex justify-between">
          <Skeleton className="w-[130px] h-[20px] rounded-md" />{" "}
          {/* Label skeleton */}
          <Skeleton className="w-[60px] h-[20px] rounded-md" />{" "}
          {/* Value skeleton */}
        </div>

        {/* Difficulty Level */}
        <div className="flex justify-between">
          <Skeleton className="w-[130px] h-[20px] rounded-md" />{" "}
          {/* Label skeleton */}
          <Skeleton className="w-[80px] h-[20px] rounded-md" />{" "}
          {/* Value skeleton */}
        </div>

        {/* Exam Price */}
        <div className="flex justify-between">
          <Skeleton className="w-[130px] h-[20px] rounded-md" />{" "}
          {/* Label skeleton */}
          <Skeleton className="w-[60px] h-[20px] rounded-md" />{" "}
          {/* Value skeleton */}
        </div>

        {/* Questions To Show */}
        <div className="flex justify-between">
          <Skeleton className="w-[130px] h-[20px] rounded-md" />{" "}
          {/* Label skeleton */}
          <Skeleton className="w-[60px] h-[20px] rounded-md" />{" "}
          {/* Value skeleton */}
        </div>

        {/* Vendor Name */}
        <div className="flex justify-between">
          <Skeleton className="w-[130px] h-[20px] rounded-md" />{" "}
          {/* Label skeleton */}
          <Skeleton className="w-[100px] h-[20px] rounded-md" />{" "}
          {/* Value skeleton */}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-[40px] rounded-md" />{" "}
        {/* Skeleton for Edit Exam button */}
      </CardFooter>
    </Card>
  );
};

export default ExamDetailCardSkeleton;
