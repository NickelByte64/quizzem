import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModel } from '~/src/features/game/game.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'quizzem',
      entities: [GameModel],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
