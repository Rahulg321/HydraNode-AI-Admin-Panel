"use client";

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
import CreateVendorForm from "./forms/CreateVendorForm";
import { useState } from "react";

export default function CreateExamTypeDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          Create Vendor <PlusCircleIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Vendor</DialogTitle>
          <DialogDescription>
            Create a new Exam Vendor with different Exams and Certifications.
            Click submit when done.
          </DialogDescription>
          <div className="mt-4">
            <CreateVendorForm setOpenDialog={setOpenDialog} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
