import { z } from "zod";

export const CreateExamFormSchema = z.object({
  topic: z.string().min(4, {
    message: "Topic Name must be at least 4 characters.",
  }),
  numberOfQuestions: z.coerce.number(),
  timeAllowed: z
    .number()
    .min(30, {
      message: "Time allowed must be at least 30 minute.",
    })
    .int("Time allowed must be an integer."),
  numberOfAttempts: z
    .number()
    .min(1, {
      message: "Number of attempts must be at least 1.",
    })
    .int("Number of attempts must be an integer."),
});

export type CreateExamFormZodType = z.infer<typeof CreateExamFormSchema>;
