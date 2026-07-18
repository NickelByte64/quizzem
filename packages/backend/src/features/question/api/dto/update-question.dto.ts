import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAnswerDto } from 'src/features/question/api/dto/update-answer.dto';
import {
  AnswerMode,
  AnswerModeEnum,
} from 'src/features/question/model/answer-mode';
import { MediaType } from 'src/features/question/model/media-type';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  text: string | null = null;

  @IsEnum(AnswerModeEnum)
  @IsOptional()
  answerMode: AnswerMode | null = null;

  @IsEnum(AnswerModeEnum)
  @IsOptional()
  mediaType: MediaType | null = null;

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto)
  answers: UpdateAnswerDto[] | null = null;
}
