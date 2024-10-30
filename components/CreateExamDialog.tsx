"use client";

import React, { useState } from "react";
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
import { Vendor } from "@prisma/client";

const CreateExamDialog = ({ vendorId }: { vendorId: string }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          Create Exam <PlusCircleIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create a New Exam for</DialogTitle>
          <DialogDescription>
            Create a new Exam. Click submit when done.
          </DialogDescription>
          <div className="mt-4">
            <CreateExamForm vendorId={vendorId} setOpenDialog={setOpenDialog} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
