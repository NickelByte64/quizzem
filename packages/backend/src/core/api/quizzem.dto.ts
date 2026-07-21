import { type UUID } from 'node:crypto';

export abstract class QuizzemDto {
  id!: UUID;
  createdAt!: Date;
  updatedAt!: Date;
}
