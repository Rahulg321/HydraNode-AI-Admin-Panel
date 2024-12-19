import { z } from "zod";

export const GenerateQuestionFormSchema = z.object({
  topic: z.string().min(5, {
    message: "Topic Name must be at least 5 characters.",
  }),
  description: z.string({}).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  numberOfQuestions: z.coerce.number().min(1).max(20),
});

export type GenerateQuestionZodType = z.infer<
  typeof GenerateQuestionFormSchema
>;
