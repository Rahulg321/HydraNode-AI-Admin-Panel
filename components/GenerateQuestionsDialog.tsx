import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { HardHatIcon, PlusCircleIcon } from "lucide-react";
import CreateExamForm from "./forms/CreateExamForm";
import { ExamType } from "@prisma/client";

const GenerateQuestionsDialog = ({}: {}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Generate Questions <HardHatIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate Questions for </DialogTitle>
          <DialogDescription>
            Create a new Exam containing AI generated questions for Vendor .
            Click submit when done.
          </DialogDescription>
          <div className="mt-4"></div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateQuestionsDialog;
