import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  MoreHorizontal,
  Plus,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import db from "@/lib/db";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar";

import Link from "next/link";
import React from "react";
import SidebarComponentButton from "./sidebar-component-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function QuestionsSidebar({ examId }: { examId: string }) {
  return (
    <Sidebar className="" collapsible="none" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton asChild>
              <a href={`/exam/${examId}/questions/new`}>
                <PlusCircle />
                <span>Add Question</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                QUESTIONS
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <React.Suspense fallback={<NavProjectsSkeleton />}>
                  <NavQuestions examId={examId} />
                </React.Suspense>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 10 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

async function NavQuestions({ examId }: { examId: string }) {
  const questions = await db.question.findMany({
    where: {
      examId,
    },
    select: {
      id: true,
      question: true,
    },
  });

  if (questions.length === 0 || !questions)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <p>No Questios Available</p>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu>
      <span>Total ({questions.length})</span>
      {questions.map((e, index) => (
        <SidebarMenuItem key={index}>
          <SidebarComponentButton
            questionId={e.id}
            questionText={e.question}
            examId={examId}
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
