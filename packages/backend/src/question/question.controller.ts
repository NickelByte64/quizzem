import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UUID } from 'crypto';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { QuestionDto } from 'src/question/dto/question.dto';
import { UpdateQuestionDto } from 'src/question/dto/update-question.dto';
import { QuestionMapper } from 'src/question/question.mapper';
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
    const pageable = await this.questionService.listQuestions(query);
    return { ...pageable, data: QuestionMapper.toDtoList(pageable.data) };
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: UUID): Promise<QuestionDto> {
    const question = await this.questionService.getQuestionById(id);
    return QuestionMapper.toDto(question);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createQuestions(@Body() data: CreateQuestionDto[]): Promise<void> {
    return await this.questionService.createQuestions(data);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async uploadQuestions(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    return await this.questionService.uploadQuestions(files);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateQuestion(
    @Param('id') id: UUID,
    @Body() data: UpdateQuestionDto,
  ): Promise<void> {
    return await this.questionService.updateQuestion(id, data);
  }
}
