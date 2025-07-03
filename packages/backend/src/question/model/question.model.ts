import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity } from 'typeorm';

@Entity('question')
export class QuestionModel extends QuizzemModel {
  @Column()
  question: string;

  @Column()
  questionType: string;

  @Column()
  correctAnswer: string;

  @Column()
  answers?: string;
}
