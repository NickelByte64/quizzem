import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from 'src/question/model/question.model';
import { QuestionController } from 'src/question/question.controller';
import { QuestionService } from 'src/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
