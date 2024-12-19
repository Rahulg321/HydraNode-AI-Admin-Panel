import QuestionsSidebar from "@/components/questions-siderbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const layout = async (props: {
  children: React.ReactNode;
  params: Promise<{ examId: string }>;
}) => {
  const params = await props.params;
  const examId = params.examId;

  const currentExam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    select: {
      name: true,
    },
  });

  if (!currentExam) return redirect("/vendors");

  const { children } = props;

  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
      className="relative"
    >
      <QuestionsSidebar examId={params.examId} examName={currentExam?.name} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
