import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsStringNumberOrBoolean } from 'src/question/decorators/is-string-number-or-boolean.decorator';
import { EQuestionType } from 'src/question/models/question-type.enum';

export class UploadQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(EQuestionType)
  @IsNotEmpty()
  questionType: EQuestionType;

  @IsStringNumberOrBoolean()
  @IsNotEmpty()
  correctAnswer: string | number | boolean;

  @IsString()
  @IsOptional()
  answers?: string;
}
