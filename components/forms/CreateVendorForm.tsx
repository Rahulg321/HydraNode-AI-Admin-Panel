"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useToast } from "../ui/use-toast";
import {
  CreateVendorFormSchema,
  VendorFormZodType,
} from "@/lib/schemas/CreateVendorSchema";
import { createVendor } from "@/lib/actions/CreateVendor";

export default function CreateVendorForm({
  setOpenDialog,
}: {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<VendorFormZodType>({
    resolver: zodResolver(CreateVendorFormSchema),
    defaultValues: {
      vendorName: "",
    },
  });
  function onSubmit(values: VendorFormZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(async () => {
      const response = await createVendor(values);
      if (response.success) {
        toast({
          variant: "success",
          title: "Successfully Created New Vendor 🎉",
          description: response.success,
        });

        form.reset();
      }

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong. ❌",
          description: response.error,
        });
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="vendorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Name</FormLabel>
              <FormControl>
                <Input placeholder="google exams" {...field} />
              </FormControl>
              <FormDescription>Enter the Name of the Vendor.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating Vendor...." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
