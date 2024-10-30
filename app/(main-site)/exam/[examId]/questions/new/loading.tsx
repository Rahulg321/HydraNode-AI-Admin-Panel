import QuestionDetailSkeleton from "@/components/skeletons/QuestionDetailSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="container block-space">
      <h2>Loading...</h2>
      <QuestionDetailSkeleton />
    </div>
  );
};

export default loading;
