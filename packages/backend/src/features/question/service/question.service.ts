import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'node:crypto';
import { PageableDto } from 'src/core/api/pageable.dto';
import { CreateQuestionDto } from 'src/features/question/api/dto/create-question.dto';
import { GetAllQuestionsParamsDto } from 'src/features/question/api/dto/get-all-questions-params.dto';
import { UpdateQuestionDto } from 'src/features/question/api/dto/update-question.dto';
import { AnswerModeEnum } from 'src/features/question/model/answer-mode';
import { AnswerModel } from 'src/features/question/model/answer.model';
import { MediaTypeEnum } from 'src/features/question/model/media-type';
import { QuestionModel } from 'src/features/question/model/question.model';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private readonly questionRepository: Repository<QuestionModel>,
    private readonly dataSource: DataSource,
  ) {}

  async getAllQuestions(
    params: GetAllQuestionsParamsDto,
  ): Promise<PageableDto<QuestionModel>> {
    const [records, count] = await this.questionRepository.findAndCount({
      skip: params.page * params.size,
      take: params.size,
      relations: {
        answers: true,
      },
    });

    return new PageableDto({
      data: records,
      page: params.page,
      size: params.size,
      totalElements: count,
    });
  }

  async getQuestionById(id: UUID): Promise<QuestionModel> {
    const record = await this.questionRepository.findOne({
      where: { id },
      relations: { answers: true },
    });
    if (!record) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }
    return record;
  }

  async createQuestion(dto: CreateQuestionDto): Promise<void> {
    const newQuestion = new QuestionModel();
    newQuestion.text = dto.text;
    newQuestion.answerMode = dto.answerMode ?? AnswerModeEnum.SINGLE_CHOICE;
    newQuestion.mediaType = dto.mediaType ?? MediaTypeEnum.NONE;

    newQuestion.answers = dto.answers.map((answer) => {
      const newAnswer = new AnswerModel();
      newAnswer.text = answer.text;
      newAnswer.isCorrectAnswer = answer.isCorrectAnswer ?? false;
      newAnswer.question = newQuestion;
      return newAnswer;
    });

    await this.questionRepository.save(newQuestion);
  }

  async createQuestionsBulk(dtos: CreateQuestionDto[]): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      for (const dto of dtos) {
        const newQuestion = new QuestionModel();
        newQuestion.text = dto.text;
        newQuestion.answerMode = dto.answerMode ?? AnswerModeEnum.SINGLE_CHOICE;
        newQuestion.mediaType = dto.mediaType ?? MediaTypeEnum.NONE;

        newQuestion.answers = dto.answers.map((answer) => {
          const newAnswer = new AnswerModel();
          newAnswer.text = answer.text;
          newAnswer.isCorrectAnswer = answer.isCorrectAnswer ?? false;
          newAnswer.question = newQuestion;
          return newAnswer;
        });

        await manager.save(newQuestion);
      }
    });
  }

  async updateQuestion(id: UUID, dto: UpdateQuestionDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const question = await manager.findOneBy(QuestionModel, { id });
      if (!question) {
        throw new NotFoundException(`Question with id ${id} not found`);
      }

      if (dto.text !== null) question.text = dto.text;
      if (dto.answerMode !== null) question.answerMode = dto.answerMode;
      if (dto.mediaType !== null) question.mediaType = dto.mediaType;

      if (dto.answers !== null) {
        question.answers = dto.answers.map((answer) => {
          const newAnswer = new AnswerModel();
          if (answer.text !== null) newAnswer.text = answer.text;
          newAnswer.isCorrectAnswer = answer.isCorrectAnswer ?? false;
          newAnswer.question = question;
          return newAnswer;
        });
      }

      await manager.save(question);
    });
  }

  async deleteQuestion(id: UUID): Promise<void> {
    await this.questionRepository.delete({ id });
  }
}
