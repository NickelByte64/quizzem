import { QuizzemDto } from 'src/utils/quizzem.dto';

export class QuestionDto extends QuizzemDto {
  question: string;

  questionType: string;

  correctAnswer: string;

  answers: string | null;
}
