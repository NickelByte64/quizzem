import type { UUID } from "node:crypto";

export type AnswerDto = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  text: string;
};
