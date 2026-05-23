import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { QuestionModel } from 'src/question/model/question.model';
import { QuestionController } from 'src/question/question.controller';
import { QuestionService } from 'src/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel])],
  controllers: [QuestionController],
  providers: [QuestionService, FileUploadService],
})
export class QuestionModule {}
