"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "./ui/use-toast";
import deleteExam from "@/lib/actions/DeleteExam";

const DeleteExamDialog = ({
  examTypeSlug,
  examId,
  examName,
  stripeProductId,
}: {
  examTypeSlug: string;
  examId: string;
  examName: string;
  stripeProductId: string;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);

  const buttonClickHandler = () => {
    startTransition(async () => {
      const response = await deleteExam(examId, examTypeSlug, stripeProductId);
      if (response.success) {
        toast({
          variant: "success",
          title: "Successfully Deleted Exam 🎉",
          description: response.success,
        });
        setOpenDialog(false);
      }

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong. ❌",
          description: response.error,
        });
      }
      // const response = await deleteExam();
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="" variant={"outline"} size={"icon"}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {examName}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this exam
            along with all its related questions.
          </DialogDescription>
          <DialogFooter className="">
            <Button
              variant={"destructive"}
              type="submit"
              className="w-full mt-4"
              onClick={buttonClickHandler}
              disabled={isPending}
            >
              {isPending ? "Deleting Exam ......" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExamDialog;
