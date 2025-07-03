import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { parse } from 'csv-parse/sync';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { UploadQuestionDto } from 'src/question/dto/upload-question.dto';
import { QuestionModel } from 'src/question/model/question.model';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private readonly questionRepository: Repository<QuestionModel>,
    private readonly dataSource: DataSource,
  ) {}

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
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    this.validateFilesMimeType(files);
    this.validateFilesSize(files);

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
   * Validates the MIME types of the uploaded files.
   */
  private validateFilesMimeType(files: Express.Multer.File[]): void {
    const ALLOWED_MIME_TYPES = ['text/csv', 'application/json'];

    for (const file of files) {
      if (!file.mimetype) {
        throw new BadRequestException('File type is missing');
      }

      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        throw new BadRequestException(
          `Invalid file type: ${file.mimetype}. Allowed types are: ${ALLOWED_MIME_TYPES.join(', ')}`,
        );
      }
    }
  }

  /**
   * Validates the total size of the uploaded files.
   */
  private validateFilesSize(files: Express.Multer.File[]): void {
    const MAX_FILES_SIZE = 5 * 1024 * 1024; // 5 MB

    const filesSizeSum = files.reduce((totalSize, file) => {
      if (!file.size) {
        throw new BadRequestException('File size is missing');
      }
      return totalSize + file.size;
    }, 0);

    if (filesSizeSum > MAX_FILES_SIZE) {
      throw new BadRequestException(
        `Total file size exceeds the limit of ${MAX_FILES_SIZE / (1024 * 1024)} MB`,
      );
    }
  }

  /**
   * Handles the uploaded JSON file. Parses the content,
   * validates the structure, and converts it to instances of UploadQuestionDto.
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

    const instances = plainToInstance(UploadQuestionDto, parsed);
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
   * validates the structure, and converts it to instances of UploadQuestionDto.
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

    const instances = plainToInstance(UploadQuestionDto, parsed);
    const errors = await Promise.all(instances.map((i) => validate(i)));
    const hasErrors = errors.some((err) => err.length > 0);
    if (hasErrors) {
      console.error('Validation errors:', errors);
      throw new BadRequestException('Invalid data structure in CSV file');
    }

    // Sanitize CSV fields
    const sanitized: UploadQuestionDto[] = instances.map((i) => {
      return {
        question: this.sanitizeCsvField(i.question),
        questionType: this.sanitizeCsvField(i.questionType),
        correctAnswer: this.sanitizeCsvField(i.correctAnswer),
        answers: this.sanitizeCsvField(i.answers),
      };
    });

    await this.saveQuestions(sanitized);
  }

  /**
   * Sanitizes a CSV field to prevent formula injection attacks.
   * If the field starts with '=', '+', '-', or '@', it prepends a single quote (')
   * to the value to treat it as a string in CSV format.
   */
  private sanitizeCsvField<T>(value: T): T {
    if (!value) return '' as T;
    const dangerousStart = ['=', '+', '-', '@'];
    return dangerousStart.includes(String(value)[0])
      ? (`'${String(value)}` as T)
      : value;
  }

  /**
   * Saves the validated questions to the database.
   */
  private async saveQuestions(questions: UploadQuestionDto[]): Promise<void> {
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
