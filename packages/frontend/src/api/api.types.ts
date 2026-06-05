import type { UUID } from "node:crypto";

export type PageableDto<T> = {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type PageableParamsDto = {
  page?: number;
  size?: number;
};

export type QuizzemDto = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
};
