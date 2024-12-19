"use client";

import React, { useTransition } from "react";
import { SidebarMenuAction, SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import HtmlContent from "./html-content";
import deleteSingleQuestion from "@/lib/actions/DeleteSingleQuestion";

const SidebarComponentButton = ({
  examId,
  questionId,
  questionText,
  questionIndex,
}: {
  examId: string;
  questionId: string;
  questionText: string;
  questionIndex: number;
}) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  let isCurrentPathname =
    pathname === `/exam/${examId}/questions/${questionId}`;

  return (
    <div>
      <SidebarMenuButton asChild isActive={isCurrentPathname}>
        <Link href={`/exam/${examId}/questions/${questionId}`}>
          Q{questionIndex}
        </Link>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            onClick={() => {
              startTransition(async () => {
                const response = await deleteSingleQuestion(questionId, examId);
                if (response.type === "success") {
                  toast({
                    title: "Question deleted Successfully 🎉",
                    description: response.message,
                  });
                } else {
                  toast({
                    title: "Error ❌",
                    description: response.message,
                  });
                }
              });
            }}
          >
            <span className="text-red-400">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarComponentButton;
