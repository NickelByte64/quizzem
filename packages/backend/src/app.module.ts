import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule, ClsService } from 'nestjs-cls';
import { resolve } from 'path';
import { DbModule } from 'src/db/db.module';
import { RequestContext } from 'src/request-context/request-context';
import { RequestContextMiddleware } from 'src/request-context/request-context.middleware';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(process.cwd(), '../..', '.env.development'),
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: false },
    }),
    DbModule,
    RedisModule,
    UserModule,
    SessionModule,
    QuestionModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly clsService: ClsService) {}

  onModuleInit(): void {
    RequestContext.setClsService(this.clsService);
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
