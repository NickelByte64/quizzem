import { Module } from '@nestjs/common';
import { DbModule } from 'src/core/db/db.module';
import { GameModule } from 'src/features/game/game.module';
import { QuestionModule } from 'src/features/question/question.module';

@Module({
  imports: [DbModule, QuestionModule, GameModule],
})
export class AppModule {}
