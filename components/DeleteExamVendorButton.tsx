"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteExamVendor } from "@/app/actions/DeleteExamVendor";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const DeleteExamVendorButton = ({ vendorId }: { vendorId: string }) => {
  const { toast } = useToast();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="absolute top-2 right-2">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={async (e) => {
              const response = await deleteExamVendor(vendorId);
              if (response.success) {
                toast({
                  variant: "success",
                  title: "Successfully Deleted Vendor 🎉",
                  description: response.success,
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              }

              if (response.error) {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong. ❌",
                  description: response.error,
                });
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteExamVendorButton;
