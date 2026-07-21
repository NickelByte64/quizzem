import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONNECTION_OPTIONS, migrationsGlob } from './db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DB_CONNECTION_OPTIONS,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [migrationsGlob],
    }),
  ],
})
export class DbModule {}
