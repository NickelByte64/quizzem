import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { RequestContext } from 'src/request-context/request-context';
import { SessionService } from 'src/session/session.service';
import { UserModel } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async signIn(data: SignInDto): Promise<void> {
    const user = await this.userService.findOneByUserName(data.userName);
    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException();
    }

    const { accessToken } = await this.generateAccessTokens(user);

    this.setTokenCookies(accessToken);
  }

  async signUp(data: SignUpDto): Promise<void> {
    const user = await this.userService.create(data);

    const { accessToken } = await this.generateAccessTokens(user);

    this.setTokenCookies(accessToken);
  }

  async signOut(): Promise<void> {
    const session = await RequestContext.getSession();
    const user = await RequestContext.getUser();
    if (!session || !user) {
      throw new NotFoundException();
    }

    await this.sessionService.remove(session);
    await this.sessionService.persistInDb(session);
  }

  async authenticated(): Promise<boolean> {
    const session = await RequestContext.getSession();
    if (!session) return false;
    return this.sessionService.validateSession(session);
  }

  private async generateAccessTokens(
    user: UserModel,
  ): Promise<TokenPayloadDto> {
    const session = await this.sessionService.createSession(user);
    return await this.sessionService.createSessionTokens(session);
  }

  private setTokenCookies(accessToken: string): void {
    const res = RequestContext.getResponse();

    res.cookie('_act_', accessToken, {
      httpOnly: true,
      path: '/',
      signed: true,
      sameSite: 'strict',
    });
  }
}
