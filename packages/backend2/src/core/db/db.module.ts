import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModel } from '~/src/features/answer/answer.model';
import { GameModel } from '~/src/features/game/game.model';
import { QuestionModel } from '~/src/features/question/question.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'quizzem',
      entities: [GameModel, QuestionModel, AnswerModel],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
