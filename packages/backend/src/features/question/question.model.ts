import { QuizzemModel } from '~/src/core/domain/quizzem.model';
import { AnswerModel } from '~/src/features/answer/answer.model';
import { QuestionType } from '~/src/features/question/question-type.model';

export class QuestionModel extends QuizzemModel {
  text: string = '';
  type: QuestionType = 'MULTIPLE_CHOICE';
  correctAnswer: string = '';
  answers: AnswerModel[] = [];
}
