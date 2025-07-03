import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { QuestionService } from 'src/question/question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async uploadQuestions(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    return await this.questionService.uploadQuestions(files);
  }
}
