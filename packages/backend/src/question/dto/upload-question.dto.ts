import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsStringNumberOrBoolean } from 'src/question/decorators/is-string-number-or-boolean.decorator';
import { QuestionType } from 'src/question/dto/question-type.enum';

export class UploadQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: QuestionType;

  @IsStringNumberOrBoolean()
  @IsNotEmpty()
  correctAnswer: string | number | boolean;

  @IsString()
  @IsOptional()
  answers?: string;
}
