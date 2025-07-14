import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_METADATA } from 'src/common/decorators/public.decorator';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const isControllerPublic = this.reflector.get<boolean>(
      PUBLIC_METADATA,
      ctx.getClass(),
    );
    const isMethodPublic = this.reflector.get<boolean>(
      PUBLIC_METADATA,
      ctx.getHandler(),
    );

    return isControllerPublic || isMethodPublic;
  }
}
