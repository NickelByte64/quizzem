import { Module } from '@nestjs/common';
import { DbModule } from 'src/core/db/db.module';
import { QuestionModule } from 'src/features/question/question.module';

@Module({
  imports: [DbModule, QuestionModule],
})
export class AppModule {}
