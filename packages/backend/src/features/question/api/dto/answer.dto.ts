import { QuizzemDto } from 'src/core/api/quizzem.dto';

export class AnswerDto extends QuizzemDto {
  text!: string;
  isCorrectAnswer!: boolean;
}
