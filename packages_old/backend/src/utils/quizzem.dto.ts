import { UUID } from 'crypto';

export abstract class QuizzemDto {
  id: UUID;
  createdAt: Date;
}
