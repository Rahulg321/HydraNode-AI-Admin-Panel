"use client";

import {
  GenerateQuestionFormSchema,
  GenerateQuestionZodType,
} from "@/app/schemas/GenerateQuestionFormSchema";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Question } from "@/lib/types";
import saveExamQuestions from "@/app/actions/SaveExamQuestions";

function getExamId(pathname: string) {
  const parts = pathname.split("/");
  return parts[2]; // 'examid' is at index 2
}

const GenerateQuestionsPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [editDialog, setEditDialog] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPending, startTransition] = useTransition();
  const [pendingSaveQuestions, startSaveTransition] = useTransition();

  const form = useForm<GenerateQuestionZodType>({
    resolver: zodResolver(GenerateQuestionFormSchema),
    defaultValues: {
      topic: "",
      difficulty: "EASY",
      numberOfQuestions: 1,
    },
  });

  const onDelete = useCallback((id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
    toast({
      variant: "destructive",
      description: "Question deleted successfully",
    });
  }, []);

  const onEdit = useCallback((id: string) => {}, []);

  const generateQuestionsColumns = columns({
    onEdit,
    onDelete,
  });

  const saveQuestionHandler = () => {
    const examId = getExamId(pathname);
    startSaveTransition(async () => {
      // await for 3 sec
      const response = await saveExamQuestions(examId, questions);
      if (response.success) {
        setQuestions([]);
        toast({
          variant: "success",
          description: "Questions saved successfully",
        });
      } else {
        toast({
          variant: "destructive",
          description: response.error || "Error Saving Questions",
        });
      }
    });
  };

  function onSubmit(values: GenerateQuestionZodType) {
    console.log("submitted values are", values);
    startTransition(async () => {
      // await for 3 sec
      try {
        const response = await axios.post("/api/generate-questions", {
          values,
        });

        if (response.status !== 200) {
          throw new Error(
            "Bad Request!! Error occurred while generating questions"
          );
        }

        console.log("questions are ", response.data.questions);

        setQuestions((prevQuestions) => [
          ...prevQuestions,
          ...response.data.questions,
        ]);

        toast({
          variant: "success",
          description: "Questions generated successfully",
        });
      } catch (error) {
        console.log("error occurred", error);
        toast({
          variant: "destructive",
          description: "Error occurred while generating questions",
        });
      }
    });
  }

  return (
    <section className="block-space big-container">
      <Button
        variant={"secondary"}
        onClick={() => {
          router.back();
        }}
      >
        Back to Exam
      </Button>
      <div className="narrow-container">
        <h1>Generate Questions</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select the Difficulty Level</FormLabel>
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
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
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
              name="numberOfQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Write the number of questions you wish to generate
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="5 questions" {...field} type="number" />
                  </FormControl>
                  <FormDescription>
                    Enter the number of questions that should be generated using
                    AI
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
              {isPending ? "Generating Questions...." : "Generate Questions"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-12">
        <h2>Generated Questions:</h2>

        <DataTable columns={generateQuestionsColumns} data={questions} />

        <Button
          onClick={saveQuestionHandler}
          disabled={pendingSaveQuestions || questions.length === 0}
        >
          {pendingSaveQuestions ? "Saving Questions..." : "Save Questions"}
        </Button>
      </div>
    </section>
  );
};

export default GenerateQuestionsPage;

// const GenerateQuestionForm = () => {};
