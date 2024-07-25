import db from "@/lib/db";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    examSlug: string;
  };
}) => {
  const exam = await db.exam.findUnique({
    where: {
      slug: params.examSlug,
    },
    include: {
      questions: true,
    },
  });
  return (
    <div>
      <h1>{exam?.name}</h1>
      {JSON.stringify(exam)}
    </div>
  );
};

export default page;
