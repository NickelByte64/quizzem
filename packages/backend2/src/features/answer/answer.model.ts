import { Column, Entity, ManyToOne } from 'typeorm';
import { QuizzemModel } from '~/src/core/domain/quizzem.model';
import { QuestionModel } from '~/src/features/question/question.model';

@Entity()
export class AnswerModel extends QuizzemModel {
  @Column()
  text: string = '';

  @ManyToOne(() => QuestionModel, (question) => question.answers)
  question!: QuestionModel;
}
