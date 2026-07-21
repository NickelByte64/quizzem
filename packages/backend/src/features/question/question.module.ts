import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from 'src/features/question/api/question.controller';
import { AnswerModel } from 'src/features/question/model/answer.model';
import { QuestionModel } from 'src/features/question/model/question.model';
import { QuestionService } from 'src/features/question/service/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel, AnswerModel])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
