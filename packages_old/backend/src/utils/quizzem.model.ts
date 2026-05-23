import { randomUUID, UUID } from 'crypto';
import { Column, PrimaryColumn } from 'typeorm';

export abstract class QuizzemModel {
  @PrimaryColumn()
  id: UUID = randomUUID();

  @Column()
  createdAt: Date;
}
