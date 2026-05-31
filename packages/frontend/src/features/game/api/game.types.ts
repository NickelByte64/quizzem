import { type UUID } from "node:crypto";
import type { QuestionDto } from "~/src/features/question/api/question.types";

export const GAME_STATE = {
  DRAFT: "DRAFT",
  LOBBY: "LOBBY",
  COUNTDOWN: "COUNTDOWN",
  QUESTION: "QUESTION",
  ANSWER_REVEAL: "ANSWER_REVEAL",
  SCOREBOARD: "SCOREBOARD",
  NEXT_QUESTION: "NEXT_QUESTION",
  FINAL_RESULTS: "FINAL_RESULTS",
  ENDED: "ENDED",
};
export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];

export type GameDto = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  state: GameState;
  title: string | null;
  description: string | null;
  questions: QuestionDto[];
};

export type CreateGameResponseDto = {
  id: UUID;
};

export type CreateGameDto = {
  title: string;
  description: string | null;
};
