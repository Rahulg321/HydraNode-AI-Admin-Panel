import React from "react";
import { Skeleton } from "../ui/skeleton";

const QuestionDetailSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      {/* Skeleton for Question Title */}
      <Skeleton className="w-3/4 h-8 rounded-md mb-2" />

      {/* Skeleton for Question Description */}
      <Skeleton className="w-full h-4 rounded-md mb-4" />
      <Skeleton className="w-5/6 h-4 rounded-md mb-4" />
      <Skeleton className="w-2/3 h-4 rounded-md mb-4" />

      {/* Skeleton for Options or Fields */}
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Skeleton className="w-5 h-5 rounded-full" /> {/* Option Icon */}
          <Skeleton className="w-3/4 h-4 rounded-md" /> {/* Option Text */}
        </div>
      ))}

      {/* Skeleton for Action Button */}
      <div className="mt-6">
        <Skeleton className="w-1/2 h-10 rounded-md" />
      </div>
    </div>
  );
};

export default QuestionDetailSkeleton;
