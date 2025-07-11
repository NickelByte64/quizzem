import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES_LIST } from 'src/db/entities-list';
import { SeedDatabaseService } from 'src/db/seed/seed-database.service';
import { IEnvVariables } from 'src/utils/env.types';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvVariables>) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ENTITIES_LIST,
      }),
    }),
    TypeOrmModule.forFeature(ENTITIES_LIST),
  ],
  providers: [SeedDatabaseService, Logger],
})
export class DbModule implements OnModuleInit {
  constructor(private readonly seedDatabaseService: SeedDatabaseService) {}

  async onModuleInit() {
    await this.seedDatabaseService.run();
  }
}
