import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ClsModule, ClsService } from 'nestjs-cls';
import { resolve } from 'path';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicGuard } from 'src/common/guards/public.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { DbModule } from 'src/db/db.module';
import { RequestContext } from 'src/request-context/request-context';
import { RequestContextMiddleware } from 'src/request-context/request-context.middleware';
import { SessionGuard } from 'src/session/guards/session.guard';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { TenantModule } from './tenant/tenant.module';
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
    CategoryModule,
    TenantModule,
  ],
  providers: [
    SessionGuard,
    PublicGuard,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_PIPE, useValue: ValidationPipe },
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
