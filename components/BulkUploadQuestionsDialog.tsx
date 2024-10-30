"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "./ui/use-toast";
import BulkUploadQuestionsButton from "./forms/BulkUploadQuestionsButton";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

const BulkUploadQuestionsDialog = ({ examId }: { examId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Bulk Upload Questions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Upload Questions</DialogTitle>
          <DialogDescription className="text-red-500 font-bold">
            Bulk Upload Questions. Please adhere to a specific schema before
            uploading file.
          </DialogDescription>
        </DialogHeader>

        <BulkUploadQuestionsButton
          examId={examId}
          setDialogState={setOpenDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadQuestionsDialog;
