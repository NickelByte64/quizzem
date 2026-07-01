import { QuizzemModel } from 'src/core/domain/quizzem.model';
import { QuestionModel } from 'src/features/question/model/question.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'answers' })
export class AnswerModel extends QuizzemModel {
  @Column({ type: 'text' })
  text!: string;

  isCorrectAnswer: boolean = false;

  @ManyToOne(() => QuestionModel, (question) => question.answers, {
    lazy: true,
    nullable: false,
  })
  question!: QuestionModel;
}
