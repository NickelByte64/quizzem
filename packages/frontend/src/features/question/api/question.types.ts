import { type UUID } from "node:crypto";

export const MEDIA_TYPE = {
  NONE: "NONE",
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  AUDIO: "AUDIO",
};
export type MediaType = (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE];

export const ANSWER_MODE = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  TRUE_FALSE: "TRUE_FALSE",
  FREE_TEXT: "FREE_TEXT",
  NUMERIC: "NUMERIC",
  ORDERING: "ORDERING",
};
export type AnswerMode = (typeof ANSWER_MODE)[keyof typeof ANSWER_MODE];

export type AnswerDto = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  isCorrectAnswer: boolean;
};

export type QuestionDto = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  type: AnswerMode;
  answers: AnswerDto[];
};

export type CreateAnswerDto = {
  text: string;
  isCorrectAnswer: boolean;
};

export type CreateQuestionDto = {
  text: string;
  answerMode: AnswerMode;
  mediaType: MediaType;
  answers: CreateAnswerDto[];
};
