import { QuizzemModel } from 'src/core/domain/quizzem.model';
import { QuestionModel } from 'src/features/question/model/question.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'answers' })
export class AnswerModel extends QuizzemModel {
  @Column({ type: 'text' })
  text!: string;

  @Column({ name: 'is_correct_answer', type: 'boolean', default: false })
  isCorrectAnswer: boolean = false;

  @ManyToOne(() => QuestionModel, (question) => question.answers, {
    lazy: true,
    nullable: false,
  })
  @JoinColumn({ name: 'question_id' })
  question!: QuestionModel;
}
