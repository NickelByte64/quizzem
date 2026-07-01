import { QuizzemModel } from 'src/core/domain/quizzem.model';
import { GameModel } from 'src/features/game/model/game.model';
import {
  AnswerModeEnum,
  type AnswerMode,
} from 'src/features/question/model/answer-mode';
import { AnswerModel } from 'src/features/question/model/answer.model';
import {
  MediaTypeEnum,
  type MediaType,
} from 'src/features/question/model/media-type';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'questions' })
export class QuestionModel extends QuizzemModel {
  @Column({ type: 'text' })
  text!: string;

  @Column({
    type: 'enum',
    enum: AnswerModeEnum,
    default: AnswerModeEnum.SINGLE_CHOICE,
  })
  answerMode: AnswerMode = AnswerModeEnum.SINGLE_CHOICE;

  @Column({ type: 'enum', enum: MediaTypeEnum, default: MediaTypeEnum.NONE })
  mediaType: MediaType = MediaTypeEnum.NONE;

  @ManyToMany(() => GameModel, (game) => game.questions, { lazy: true })
  games: GameModel[] = [];

  @OneToMany(() => AnswerModel, (answer) => answer.question, {
    cascade: true,
    lazy: true,
    orphanedRowAction: 'delete',
  })
  answers: AnswerModel[] = [];
}
