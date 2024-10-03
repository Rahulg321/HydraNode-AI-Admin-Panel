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
import { Vendor } from "@prisma/client";

const CreateExamDialog = ({ vendor }: { vendor: Vendor }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Exam <PlusCircleIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create an Exam for {vendor.name}</DialogTitle>
          <DialogDescription>
            Create a new Exam containing AI generated questions for Vendor{" "}
            {vendor.name}. Click submit when done.
          </DialogDescription>
          <div className="mt-4">
            <CreateExamForm vendorId={vendor.id} vendorSlug={vendor.slug} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
