/**
 * @see PageableQuery
 * @see PageableQueryDto
 */
export class PageableQueryDto {
  page: number;
  size: number;

  static getSkip(page: number, size: number): number {
    return page * size;
  }

  static getTake(size: number): number {
    return size;
  }
}
