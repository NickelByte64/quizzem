import { type UUID } from "node:crypto";
import type { AnswerDto } from "~/src/features/answer/api/answer.types";
export const QUESTION_TYPE = {
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  TRUE_FALSE: "TRUE_FALSE",
  FILL_IN_THE_BLANK: "FILL_IN_THE_BLANK",
  ORDERING: "ORDERING",
  ESTIMATE: "ESTIMATE",
  NUMERIC: "NUMERIC",
  IMAGE_QUESTION: "IMAGE_QUESTION",
  MUSIC_QUESTION: "MUSIC_QUESTION",
  VIDEO_QUESTION: "VIDEO_QUESTION",
};
export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export type QuestionDto = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  type: QuestionType;
  answers: AnswerDto[];
};
