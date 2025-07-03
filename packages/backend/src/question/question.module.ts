import { Module } from '@nestjs/common';
import { QuestionController } from 'src/question/question.controller';
import { QuestionService } from 'src/question/question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
