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

const ExamCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="relative rounded-b-md">
        <Skeleton className="w-[150px] h-[24px] rounded-md mb-2" />{" "}
        {/* Skeleton for exam name */}
        <Skeleton className="w-full h-[20px] rounded-md mb-4" />{" "}
        {/* Skeleton for description */}
        <div className="absolute top-2 right-2">
          <Skeleton className="w-[20px] h-[20px] rounded-md" />{" "}
          {/* Skeleton for delete button */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Exam Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-[100px] h-[20px] rounded-full" />{" "}
            {/* Label skeleton */}
          </div>
          <Skeleton className="w-[60px] h-[20px] rounded-md" />{" "}
          {/* Price skeleton */}
        </div>

        {/* Questions to Show */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-[100px] h-[20px] rounded-full" />{" "}
            {/* Label skeleton */}
          </div>
          <Skeleton className="w-[40px] h-[20px] rounded-md" />{" "}
          {/* Count skeleton */}
        </div>

        {/* Total Time Allowed */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-[120px] h-[20px] rounded-full" />{" "}
            {/* Label skeleton */}
          </div>
          <Skeleton className="w-[60px] h-[20px] rounded-md" />{" "}
          {/* Time skeleton */}
        </div>

        {/* Exam Level */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-[100px] h-[20px] rounded-full" />{" "}
            {/* Label skeleton */}
          </div>
          <Skeleton className="w-[80px] h-[20px] rounded-md" />{" "}
          {/* Level skeleton */}
        </div>

        {/* Available Attempts */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-[120px] h-[20px] rounded-full" />{" "}
            {/* Label skeleton */}
          </div>
          <Skeleton className="w-[40px] h-[20px] rounded-md" />{" "}
          {/* Attempts skeleton */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Skeleton className="w-full h-[40px] rounded-md" />{" "}
        {/* Button skeleton */}
      </CardFooter>
    </Card>
  );
};

export default ExamCardSkeleton;
