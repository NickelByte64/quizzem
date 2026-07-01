/**
 * @default page = 0
 * @default size = 10
 */
export abstract class PageableParamsDto {
  page: number;
  size: number;

  constructor(page: number = 0, size: number = 10) {
    this.page = page;
    this.size = size;
  }
}
