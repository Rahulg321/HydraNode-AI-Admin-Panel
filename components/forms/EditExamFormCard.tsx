"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import EditExam from "@/app/actions/EditExam";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HardHatIcon, PlusCircleIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

const EditExamFormCard = ({
  examId,
  examSlug,
  stripePriceId,
  stripeProductId,
  topic,
  ExamLevel,
  timeAllowed,
  description,
  numberOfAttempts,
  price,
  questionsToShow,
}: {
  examId: string;
  examSlug: string;
  stripePriceId: string;
  stripeProductId: string;
  topic: string;
  description: string;
  ExamLevel: "ASSOCIATE" | "PROFESSIONAL" | "EXPERT" | undefined;
  timeAllowed: number;
  numberOfAttempts: number;
  price: number;
  questionsToShow: number;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CreateExamFormZodType>({
    resolver: zodResolver(CreateExamFormSchema),
    defaultValues: {
      topic,
      ExamLevel,
      timeAllowed,
      price,
      questionsToShow,
      numberOfAttempts,
      description,
    },
  });

  function onSubmit(values: CreateExamFormZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      // wait for 3 sec
      const response = await EditExam(
        examId,
        examSlug,
        values,
        stripePriceId,
        stripeProductId
      );
      if (response.success) {
        toast({
          variant: "success",
          title: "Successfully Updated Exam 🎉",
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
      form.reset();
    });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          Edit Exam Details <HardHatIcon className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Exam Details</DialogTitle>
          <DialogDescription>
            Change the exam details and Click on save button to save the
            changes.
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-4xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the difficulty level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ASSOCIATE">Associate</SelectItem>
                        <SelectItem value="PROFESSIONAL">
                          Professional
                        </SelectItem>
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
                      <Input
                        placeholder="45 minutes"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the number of minutes an exam should take to
                      complete.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price for Exam</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      Price for the Exam will be stored in USD$.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionsToShow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions to Show</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      These are the number of questions that will be shown to
                      the user in the frontend when is taking the exam.
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
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="1" {...field} className="" />
                      </FormControl>
                      <FormDescription>
                        Enter description for the exam.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full col-span-2"
                disabled={isPending}
              >
                {isPending ? "Saving Changes...." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditExamFormCard;
