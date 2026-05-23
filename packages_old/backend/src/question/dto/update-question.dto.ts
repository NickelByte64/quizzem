import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  questionType: string;

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsString()
  @IsOptional()
  answers: string | null;
}
