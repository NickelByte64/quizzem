import { Column, Entity, OneToMany } from 'typeorm';
import { QuizzemModel } from '~/src/core/domain/quizzem.model';
import { AnswerModel } from '~/src/features/answer/answer.model';
import type { QuestionType } from '~/src/features/question/question-type.model';

@Entity()
export class QuestionModel extends QuizzemModel {
  @Column()
  text: string = '';

  @Column()
  type: QuestionType = 'MULTIPLE_CHOICE';

  @Column()
  correctAnswer: string = '';

  @OneToMany(() => AnswerModel, (answer) => answer.question)
  answers!: AnswerModel[];
}
