import { Inject } from '@nestjs/common';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
export const InjectRedis = (): PropertyDecorator & ParameterDecorator =>
  Inject(REDIS_CLIENT);
