import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { UUID } from 'node:crypto';
import { PageableDto } from 'src/core/api/pageable.dto';
import { CreateQuestionDto } from 'src/features/question/api/dto/create-question.dto';
import { GetAllQuestionsParamsDto } from 'src/features/question/api/dto/get-all-questions-params.dto';
import { QuestionDto } from 'src/features/question/api/dto/question.dto';
import { UpdateQuestionDto } from 'src/features/question/api/dto/update-question.dto';
import { QuestionMapper } from 'src/features/question/mapper/question.mapper';
import { QuestionService } from 'src/features/question/service/question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllQuestions(
    @Query() params: GetAllQuestionsParamsDto,
  ): Promise<PageableDto<QuestionDto>> {
    const questions = await this.questionService.getAllQuestions(params);

    return {
      ...questions,
      data: questions.data.map((question) =>
        QuestionMapper.toQuestionDto(question),
      ),
    };
  }

  @Get(':id')
  async getQuestionById(@Param() id: UUID): Promise<QuestionDto> {
    const question = await this.questionService.getQuestionById(id);
    return QuestionMapper.toQuestionDto(question);
  }

  @Post()
  @HttpCode(201)
  async createQuestion(@Body() dto: CreateQuestionDto): Promise<void> {
    return await this.questionService.createQuestion(dto);
  }

  @Post('/bulk')
  @HttpCode(201)
  async createQuestionsBulk(@Body() dtos: CreateQuestionDto[]): Promise<void> {
    return await this.questionService.createQuestionsBulk(dtos);
  }

  @Patch(':id')
  @HttpCode(204)
  async updateQuestion(
    @Param() id: UUID,
    @Body() dto: UpdateQuestionDto,
  ): Promise<void> {
    return await this.questionService.updateQuestion(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteQuestion(@Param() id: UUID): Promise<void> {
    return await this.questionService.deleteQuestion(id);
  }
}
