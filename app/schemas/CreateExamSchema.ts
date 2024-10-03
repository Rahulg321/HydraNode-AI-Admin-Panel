import { z } from "zod";

export const CreateExamFormSchema = z.object({
  topic: z.string().min(4, {
    message: "Topic Name must be at least 4 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Exam Description must be at least 10 characters.",
    })
    .optional(),
  ExamLevel: z.enum(["ASSOCIATE", "PROFESSIONAL", "EXPERT"]),
  timeAllowed: z.coerce
    .number()
    .min(1, {
      message: "Time allowed must be at least 1 minute.",
    })
    .int("Time allowed must be an integer."),
  questionsToShow: z.coerce
    .number()
    .min(1, {
      message: "Questions to Show must be at least 1.",
    })
    .int("Price must be an integer."),
  price: z.coerce
    .number()
    .min(1, {
      message: "Price must be at least 1.",
    })
    .int("Price must be an integer."),
  numberOfAttempts: z.coerce
    .number()
    .min(1, {
      message: "Number of attempts must be at least 1.",
    })
    .int("Number of attempts must be an integer."),
});

export type CreateExamFormZodType = z.infer<typeof CreateExamFormSchema>;
