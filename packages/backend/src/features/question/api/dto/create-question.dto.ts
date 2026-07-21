import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/features/question/api/dto/create-answer.dto';
import {
  type AnswerMode,
  AnswerModeEnum,
} from 'src/features/question/model/answer-mode';
import {
  type MediaType,
  MediaTypeEnum,
} from 'src/features/question/model/media-type';

export class CreateQuestionDto {
  @IsString()
  text!: string;

  @IsEnum(AnswerModeEnum)
  answerMode: AnswerMode = AnswerModeEnum.SINGLE_CHOICE;

  @IsEnum(MediaTypeEnum)
  mediaType: MediaType = MediaTypeEnum.NONE;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[] = [];
}
