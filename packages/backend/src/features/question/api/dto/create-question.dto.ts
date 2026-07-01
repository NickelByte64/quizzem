import { CreateAnswerDto } from 'src/features/question/api/dto/create-answer.dto';
import {
  type AnswerMode,
  AnswerModeEnum,
} from 'src/features/question/model/answer-mode';
import {
  MediaType,
  MediaTypeEnum,
} from 'src/features/question/model/media-type';

export class CreateQuestionDto {
  text!: string;
  answerMode: AnswerMode | null = AnswerModeEnum.SINGLE_CHOICE;
  mediaType: MediaType | null = MediaTypeEnum.NONE;
  answers: CreateAnswerDto[] = [];
}
