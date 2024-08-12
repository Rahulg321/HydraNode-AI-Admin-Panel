"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  CreateExamFormSchema,
  CreateExamFormZodType,
} from "@/app/schemas/CreateExamSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createExam from "@/app/actions/CreateExam";

const CreateExamForm = ({
  vendorId,
  vendorSlug,
}: {
  vendorId: string;
  vendorSlug: string;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateExamFormZodType>({
    resolver: zodResolver(CreateExamFormSchema),
    defaultValues: {
      topic: "",
      ExamLevel: "ASSOCIATE",
      timeAllowed: 30,
      numberOfAttempts: 1,
    },
  });

  function onSubmit(values: CreateExamFormZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const reponse = await createExam(values, vendorId, vendorSlug);
      if (reponse.success) {
        toast({
          variant: "success",
          title: "Successfully Created New Exam 🎉",
          description: reponse.success,
        });
      }

      if (reponse.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong. ❌",
          description: reponse.error,
        });
      }
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4"
      >
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
          name="ExamLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select the Exam Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the difficulty level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ASSOCIATE">Associate</SelectItem>
                  <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                  <SelectItem value="EXPERT">Expert</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select an appropriate difficulty level for the exam.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeAllowed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Allowed for completing the Exam</FormLabel>
              <FormControl>
                <Input placeholder="45 minutes" {...field} type="number" />
              </FormControl>
              <FormDescription>
                Enter the number of minutes an exam should take to complete.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfAttempts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Attempts</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} type="number" />
              </FormControl>
              <FormDescription>
                Enter the number of attempts an exam should have.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full col-span-2"
          disabled={isPending}
        >
          {isPending ? "Creating Exam...." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateExamForm;
