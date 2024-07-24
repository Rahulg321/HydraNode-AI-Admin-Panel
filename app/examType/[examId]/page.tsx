import db from "@/lib/db";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    examId: string;
  };
}) => {
  const examType = await db.examType.findUnique({
    where: {
      slug: params.examId,
    },
    include: {
      exams: true,
    },
  });
  return <div>{JSON.stringify(examType)}</div>;
};

export default page;
