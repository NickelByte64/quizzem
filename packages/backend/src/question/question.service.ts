import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { parse } from 'csv-parse/sync';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { QuestionModel } from 'src/question/model/question.model';
import { PageableQueryDto } from 'src/utils/pageable/dto/pageable-query.dto';
import { PageableDto } from 'src/utils/pageable/dto/pageable.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    private readonly fileUploadService: FileUploadService,
    @InjectRepository(QuestionModel)
    private readonly questionRepository: Repository<QuestionModel>,
    private readonly dataSource: DataSource,
  ) {}

  async listQuestions(
    query: PageableQueryDto,
  ): Promise<PageableDto<QuestionModel>> {
    const { page, size } = query;
    const [questions, total] = await this.questionRepository.findAndCount({
      take: PageableQueryDto.getTake(size),
      skip: PageableQueryDto.getSkip(page, size),
      order: { createdAt: 'DESC' },
    });

    return new PageableDto<QuestionModel>({
      data: questions,
      totalElements: total,
      page,
      size,
    });
  }

  async createQuestions(data: CreateQuestionDto[]): Promise<void> {
    await this.saveQuestions(data);
  }

  /**
   * Handle the file upload of questions in the JSON and/or CSV format.
   * This method validates the files, checks their MIME types and sizes,
   * and processes them accordingly.
   * The questions are then stored in the database.
   */
  async uploadQuestions(files: Express.Multer.File[]): Promise<void> {
    this.fileUploadService.validateFilesExist(files);
    this.fileUploadService.validateFilesMimeType(files, [
      'text/csv',
      'application/json',
    ]);
    this.fileUploadService.validateFilesSize(files);

    const jsonFile = files.find((file) => file.mimetype === 'application/json');
    const csvFile = files.find((file) => file.mimetype === 'text/csv');

    if (jsonFile) {
      await this.handleJsonFile(jsonFile);
    } else if (csvFile) {
      await this.handleCsvFile(csvFile);
    } else {
      throw new BadRequestException(
        'No valid file type found. Expected JSON or CSV.',
      );
    }
  }

  /**
   * Handles the uploaded JSON file. Parses the content,
   * validates the structure, and converts it to instances of CreateQuestionDto.
   * If the structure is valid, it saves the instances to the database.
   */
  private async handleJsonFile(file: Express.Multer.File): Promise<void> {
    const content = file.buffer.toString('utf-8');
    let parsed: unknown;

    try {
      parsed = JSON.parse(content);
    } catch (error) {
      console.error('JSON parsing error:', error);
      throw new BadRequestException('Invalid JSON format');
    }

    if (!Array.isArray(parsed)) {
      throw new BadRequestException('JSON must be an array of questions');
    }

    const instances = plainToInstance(CreateQuestionDto, parsed);
    const errors = await Promise.all(instances.map((i) => validate(i)));

    const hasErrors = errors.some((err) => err.length > 0);
    if (hasErrors) {
      console.error('Validation errors:', errors);
      throw new BadRequestException('Invalid data structure in JSON file');
    }

    await this.saveQuestions(instances);
  }

  /**
   * Handles the uploaded CSV file. Parses the content,
   * validates the structure, and converts it to instances of CreateQuestionDto.
   * If the structure is valid, it saves the instances to the database.
   */
  private async handleCsvFile(file: Express.Multer.File): Promise<void> {
    const content = file.buffer.toString('utf-8');

    const parsed: unknown = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      cast: (value, context) => {
        const key = context.column;

        if (key === 'correctAnswer') {
          if (
            value.toLowerCase() === 'true' ||
            value.toLowerCase() === 'false'
          ) {
            return Boolean(value);
          } else if (!isNaN(Number(value)) && value.trim() !== '') {
            return Number(value);
          } else {
            return value;
          }
        }
        return value;
      },
    });

    if (!Array.isArray(parsed)) {
      throw new BadRequestException('CSV must be an array of questions');
    }

    const instances = plainToInstance(CreateQuestionDto, parsed);
    const errors = await Promise.all(instances.map((i) => validate(i)));
    const hasErrors = errors.some((err) => err.length > 0);
    if (hasErrors) {
      console.error('Validation errors:', errors);
      throw new BadRequestException('Invalid data structure in CSV file');
    }

    // Sanitize CSV fields
    const sanitized: CreateQuestionDto[] = instances.map((i) => {
      return {
        question: this.fileUploadService.sanitizeCsvFields(i.question),
        questionType: this.fileUploadService.sanitizeCsvFields(i.questionType),
        correctAnswer: this.fileUploadService.sanitizeCsvFields(
          i.correctAnswer,
        ),
        answers: this.fileUploadService.sanitizeCsvFields(i.answers),
      };
    });

    await this.saveQuestions(sanitized);
  }

  /**
   * Saves the validated questions to the database.
   */
  private async saveQuestions(questions: CreateQuestionDto[]): Promise<void> {
    const createdQuestions = questions.map((question) => {
      return this.questionRepository.create({
        question: question.question,
        questionType: question.questionType,
        correctAnswer: String(question.correctAnswer),
        answers: question.answers,
      });
    });

    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(createdQuestions);
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes(
            'duplicate key value violates unique constraint',
          )
        ) {
          throw new BadRequestException('Duplicate questions found.');
        }
      }
      throw new InternalServerErrorException(
        'Failed to save questions to the database',
      );
    }
  }
}
