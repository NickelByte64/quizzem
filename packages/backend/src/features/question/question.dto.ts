import { QuizzemDto } from '~/src/core/domain/quizzem.dto';
import { AnswerDto } from '~/src/features/answer/answer.dto';
import { QuestionType } from '~/src/features/question/question-type.model';

/**
 * @see QuestionModel
 */
export class QuestionDto extends QuizzemDto {
  text!: string;
  type!: QuestionType;
  correctAnswer!: string;
  answers!: AnswerDto[];
}
