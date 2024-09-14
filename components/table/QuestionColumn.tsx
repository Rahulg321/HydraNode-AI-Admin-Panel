"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
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
}: ColumnProps): ColumnDef<QuestionWithDetails>[] => {
  // Static columns like select, question, type, and correct answers
  const baseColumns: ColumnDef<QuestionWithDetails>[] = [
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
  ];

  // Dynamically add columns for each option
  const optionColumns = Array.from({ length: 6 }, (_, idx) => ({
    accessorKey: `options[${idx}].option`,
    header: `Option ${idx + 1}`,
    cell: ({ row }: { row: { original: QuestionWithDetails } }) =>
      row.original.options[idx] ? (
        <div>
          <span>{row.original.options[idx].option}</span>
          <br />
          <small>Explanation: {row.original.options[idx].explanation}</small>
        </div>
      ) : null,
  }));

  // Add actions column
  const actionsColumn: ColumnDef<QuestionWithDetails> = {
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
  };

  // Combine static columns, option columns, and actions column
  return [...baseColumns, ...optionColumns, actionsColumn];
};
