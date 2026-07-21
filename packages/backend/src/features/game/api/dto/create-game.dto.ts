import { IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description: string | null = null;
}
