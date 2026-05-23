import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/redis/redis.decorator';
import { IEnvVariables } from 'src/utils/env.types';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvVariables>) => {
        return new Redis({
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
        });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
