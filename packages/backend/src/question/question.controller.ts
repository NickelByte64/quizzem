import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { QuestionDto } from 'src/question/dto/question.dto';
import { QuestionMapper } from 'src/question/mappers/question.mapper';
import { QuestionService } from 'src/question/question.service';
import { PageableQueryDto } from 'src/utils/pageable/dto/pageable-query.dto';
import { PageableDto } from 'src/utils/pageable/dto/pageable.dto';
import { PageableQuery } from 'src/utils/pageable/pageable.query';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions(
    @PageableQuery() query: PageableQueryDto,
  ): Promise<PageableDto<QuestionDto>> {
    const questions = await this.questionService.getQuestions(query);
    return {
      ...questions,
      data: QuestionMapper.toDtoList(questions.data),
    };
  }

  @Post()
  async addQuestion(@Body() body: CreateQuestionDto): Promise<void> {
    return await this.questionService.addQuestion(body);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async uploadQuestions(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    return await this.questionService.uploadQuestions(files);
  }
}
