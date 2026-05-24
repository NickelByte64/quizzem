import { randomUUID, type UUID } from 'node:crypto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class QuizzemModel {
  @PrimaryGeneratedColumn('uuid')
  id: UUID = randomUUID();

  @Column('timestamptz')
  createdAt: Date = new Date();

  @Column('timestamptz', { nullable: true })
  updatedAt: Date | null = null;
}
