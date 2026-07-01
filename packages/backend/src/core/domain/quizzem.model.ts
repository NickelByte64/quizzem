import { type UUID } from 'node:crypto';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class QuizzemModel {
  @PrimaryGeneratedColumn('uuid')
  id!: UUID;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
