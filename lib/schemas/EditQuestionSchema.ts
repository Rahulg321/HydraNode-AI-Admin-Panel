import { z } from "zod";

export const EditQuestionFormSchema = z.object({
  question: z.string().min(5, {
    message: "Question Name must be at least 5 characters.",
  }),
  answer: z.string(),

  option1: z.string(),

  option2: z.string(),

  option3: z.string(),
  option4: z.string(),
});

export type EditQuestionZodType = z.infer<typeof EditQuestionFormSchema>;
