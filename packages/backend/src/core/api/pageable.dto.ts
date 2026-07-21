type PageableDtoConstructorParams<T> = {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
};

export class PageableDto<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;

  constructor(params: PageableDtoConstructorParams<T>) {
    this.data = params.data;
    this.page = params.page;
    this.size = params.size;
    this.totalElements = params.totalElements;
    this.totalPages = Math.ceil(params.totalElements / params.size);
  }
}
