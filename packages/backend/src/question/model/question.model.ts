import { QuestionType } from 'src/question/dto/question-type.enum';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity } from 'typeorm';

@Entity('question')
export class QuestionModel extends QuizzemModel {
  @Column()
  question: string;

  @Column({
    type: 'varchar',
    length: 64,
    default: QuestionType.MULTIPLE_CHOICE,
  })
  questionType: string;

  @Column()
  correctAnswer: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  answers?: string;
}
