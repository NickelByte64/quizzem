import { QuizzemDto } from 'src/core/api/quizzem.dto';
import { AnswerDto } from 'src/features/question/api/dto/answer.dto';
import { AnswerMode } from 'src/features/question/model/answer-mode';
import { MediaType } from 'src/features/question/model/media-type';

export class QuestionDto extends QuizzemDto {
  text!: string;
  answerMode!: AnswerMode;
  mediaType!: MediaType;
  answers!: AnswerDto[];
}
