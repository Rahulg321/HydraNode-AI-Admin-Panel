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

const CreateExamDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Exam <PlusCircleIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Exam</DialogTitle>
          <DialogDescription>
            Create a new Exam containing AI generated questions. Click submit
            when done.
          </DialogDescription>
          <div className="mt-4">
            <CreateExamForm />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
