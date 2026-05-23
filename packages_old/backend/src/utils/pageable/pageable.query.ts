import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Query parameters for pageable requests.
 * This decorator extracts `page` and `size` from the request query parameters
 * and provides default values if they are not present.
 * @see PageableDto
 * @see PageableQueryDto
 */
export const PageableQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const query = request.query;

    // Convert and default values
    const page = query.page !== undefined ? Number(query.page) : 0;
    const size = query.size !== undefined ? Number(query.size) : 10;

    return { page, size };
  },
);
