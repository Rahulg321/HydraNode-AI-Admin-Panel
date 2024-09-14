"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CloudLightning, MoreHorizontal, Trash2Icon } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, useToast } from "../ui/use-toast";
import { QuestionType } from "@prisma/client";
// import { Question } from "@prisma/client";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type QuestionWithDetails = {
  id: string;
  question: string;
  type: QuestionType;
  overallExplanation: string;
  examId: string;
  createdAt: Date;
  options: Array<{ option: string; explanation: string }>; // Array of options with explanations
  correctAnswers: Array<{ answer: string }>; // Array of correct answers
};

type ColumnProps = {
  onEdit: (question: QuestionWithDetails) => void;
  onDelete: (id: string) => void;
};

export const QuestionColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<QuestionWithDetails>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "question",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "correctAnswers",
    header: "Correct Answers",
    cell: ({ row }) => (
      <div className="gap-2">
        {row.original.correctAnswers.map((answer, idx) => (
          <span key={idx} className="text-sm text-green-500 odd:mr-2">
            {answer.answer}
          </span>
        ))}
      </div>
    ), // Display all correct answers
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => (
      <div>
        {row.original.options.map((option, idx) => (
          <div key={idx}>
            <strong>Option {idx + 1}: </strong>
            <span>{option.option}</span>
            <br />
            <small>Explanation: {option.explanation}</small>
          </div>
        ))}
      </div>
    ), // Display options and their explanations
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const questionCell = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                console.log(questionCell);
                onEdit(questionCell);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive hover:text-red-400 cursor-pointer"
              onClick={() => {
                onDelete(questionCell.id);
              }}
            >
              Delete <Trash2Icon className="h-4 w-4 ml-2" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
