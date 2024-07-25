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
import { PlusCircleIcon } from "lucide-react";
import CreateExamForm from "./forms/CreateExamForm";
import { ExamType } from "@prisma/client";

const CreateExamDialog = ({ examType }: { examType: ExamType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Exam <PlusCircleIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create an Exam for {examType.name}</DialogTitle>
          <DialogDescription>
            Create a new Exam containing AI generated questions for Vendor{" "}
            {examType.name}. Click submit when done.
          </DialogDescription>
          <div className="mt-4">
            <CreateExamForm
              examTypeId={examType.id}
              examTypeSlug={examType.slug}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
