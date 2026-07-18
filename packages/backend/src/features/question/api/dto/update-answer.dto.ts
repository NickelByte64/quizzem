import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @IsString()
  @IsOptional()
  text: string | null = null;

  @IsBoolean()
  @IsOptional()
  isCorrectAnswer: boolean | null = null;
}
