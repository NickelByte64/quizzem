import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * @default page = 0
 * @default size = 10
 */
export abstract class PageableParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number;

  constructor(page: number = 0, size: number = 10) {
    this.page = page;
    this.size = size;
  }
}
