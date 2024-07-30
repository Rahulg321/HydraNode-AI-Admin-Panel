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
import { Question } from "@/lib/types";
import { toast, useToast } from "../ui/use-toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type ColumnProps = {
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
};

export const QuestionColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<Question>[] => [
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
    accessorKey: "answer",
    header: "Answer",
  },
  {
    accessorKey: "option1",
    header: "Option1",
  },
  {
    accessorKey: "option2",
    header: "Option2",
  },
  {
    accessorKey: "option3",
    header: "Option3",
  },
  {
    accessorKey: "option4",
    header: "Option4",
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
