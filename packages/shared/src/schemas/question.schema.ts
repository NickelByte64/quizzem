import { z } from 'zod';

export const questionSchema = z.object({
  id: z.uuid(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.array(z.string()),
});
export type Question = z.infer<typeof questionSchema>;
