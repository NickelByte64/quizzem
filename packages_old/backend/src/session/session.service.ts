import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import Redis from 'ioredis';
import { V4 } from 'paseto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { InjectRedis } from 'src/redis/redis.decorator';
import { SessionModel } from 'src/session/model/session.model';
import { SessionRedis } from 'src/session/model/session.redis';
import { UserModel } from 'src/user/model/user.model';
import { IEnvVariables } from 'src/utils/env.types';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(SessionModel)
    private readonly sessionModel: Repository<SessionModel>,
    private readonly configService: ConfigService<IEnvVariables>,
  ) {}

  async createSession(user: UserModel): Promise<SessionRedis> {
    const newSession = new SessionRedis();
    newSession.userId = user.id;

    await this.redis.set(
      'session:' + newSession.id,
      JSON.stringify(newSession),
    );
    return newSession;
  }

  async createSessionTokens(session: SessionRedis): Promise<TokenPayloadDto> {
    const payload = { id: session.id };

    const accessToken = await V4.sign(
      payload,
      this.configService.getOrThrow('PASETO_PRIVATE_KEY'),
    );

    return { accessToken };
  }

  async findSessionByToken(token: string): Promise<SessionRedis | null> {
    const payload: { id: UUID } = await V4.verify(
      token,
      this.configService.getOrThrow('PASETO_PUBLIC_KEY'),
    );
    const session = await this.redis.get('session:' + payload.id);
    return session ? (JSON.parse(session) as SessionRedis) : null;
  }

  validateSession(session: SessionRedis): boolean {
    if (!session) return false;
    return new Date(session.expiresAt) >= new Date();
  }

  async remove(session: SessionRedis): Promise<void> {
    await this.redis.del('session:' + session.id);
  }

  async persistInDb(redisSession: SessionRedis) {
    const session = this.sessionModel.create(redisSession);
    await this.sessionModel.save(session);
  }
}
