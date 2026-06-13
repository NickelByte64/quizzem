import type { PageableParamsDto, QuizzemDto } from "~/src/api/api.types";

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

export type AnswerDto = QuizzemDto & {
  text: string;
  isCorrectAnswer: boolean;
};

export type QuestionDto = QuizzemDto & {
  text: string;
  answerMode: AnswerMode;
  mediaType: MediaType;
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

export type GetAllQuestionsParamsDto = PageableParamsDto;

type UpdateAnswerDto = {
  text: string;
  isCorrectAnswer: boolean;
};

export type UpdateQuestionDto = {
  text: string | null;
  answerMode: AnswerMode | null;
  mediaType: MediaType | null;
  answers: UpdateAnswerDto[] | null;
};
