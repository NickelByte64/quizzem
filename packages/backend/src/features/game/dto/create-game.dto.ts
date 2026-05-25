import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  description: string | null = null;
}
