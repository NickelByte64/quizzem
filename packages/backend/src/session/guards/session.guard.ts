import { CanActivate, Injectable } from '@nestjs/common';
import { RequestContext } from 'src/request-context/request-context';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(): Promise<boolean> {
    const user = await RequestContext.getUser();
    if (!user) return false;

    const session = await RequestContext.getSession();
    if (!session) return false;

    const isSessionValid = this.sessionService.validateSession(session);
    if (!isSessionValid) {
      await this.sessionService.remove(session);
      await this.sessionService.persistInDb(session);
      return false;
    }

    return true;
  }
}
