import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'node:crypto';

export class UpdateGameDto {
  @IsOptional()
  @IsString()
  title: string | null = null;

  @IsOptional()
  @IsString()
  description: string | null = null;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  questions: UUID[] | null = null;
}
