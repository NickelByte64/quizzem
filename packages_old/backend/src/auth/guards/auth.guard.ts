import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PublicGuard } from 'src/common/guards/public.guard';
import { SessionGuard } from 'src/session/guards/session.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly sessionGuard: SessionGuard,
    private readonly publicGuard: PublicGuard,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.publicGuard.canActivate(ctx);

    if (isPublic) return true;

    return await this.sessionGuard.canActivate();
  }
}
