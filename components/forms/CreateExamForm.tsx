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
import { createVendor } from "@/app/actions/CreateVendor";
import { useToast } from "../ui/use-toast";
import {
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "@/app/schemas/CreateExamSchema";

const CreateExamForm = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateExamFormZodType>({
    resolver: zodResolver(CreateExamFormSchema),
    defaultValues: {
      topic: "",
      numberOfQuestions: 0,
    },
  });

  function onSubmit(values: CreateExamFormZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("hello world");
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Name</FormLabel>
              <FormControl>
                <Input placeholder="cloud engineer..." {...field} />
              </FormControl>
              <FormDescription>Enter a topic name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions</FormLabel>
              <FormControl>
                <Input placeholder="12" {...field} type="number" />
              </FormControl>
              <FormDescription>
                Enter the number of questions an exam should have.
              </FormDescription>
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
};

export default CreateExamForm;
