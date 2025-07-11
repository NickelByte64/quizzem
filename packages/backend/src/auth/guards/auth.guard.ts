import { CanActivate, Injectable } from '@nestjs/common';
import { SessionGuard } from 'src/session/guards/session.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionGuard: SessionGuard) {}

  async canActivate(): Promise<boolean> {
    return await this.sessionGuard.canActivate();
  }
}
