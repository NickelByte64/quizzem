import { UpdateAnswerDto } from 'src/features/question/api/dto/update-answer.dto';
import { AnswerMode } from 'src/features/question/model/answer-mode';
import { MediaType } from 'src/features/question/model/media-type';

export class UpdateQuestionDto {
  text: string | null = null;
  answerMode: AnswerMode | null = null;
  mediaType: MediaType | null = null;
  answers: UpdateAnswerDto[] | null = null;
}
