import QuestionsSidebar from "@/components/questions-siderbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { examId: string };
}) => {
  return (
    <SidebarProvider
      style={{
        // @ts-ignore
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
      className="relative"
    >
      <QuestionsSidebar examId={params.examId} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
