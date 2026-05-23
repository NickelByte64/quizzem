import { BadRequestException, Injectable } from '@nestjs/common';

/**
 * Service for handling file uploads, including validation of file existence,
 * MIME types, sizes, and sanitization of CSV fields.
 */
@Injectable()
export class FileUploadService {
  /**
   * Checks if the uploaded files exist.
   */
  validateFilesExist(input: Express.Multer.File | Express.Multer.File[]): void {
    if (!input) {
      throw new BadRequestException('No files provided');
    }

    if (Array.isArray(input) && input.length === 0) {
      throw new BadRequestException('No files provided');
    }
  }

  /**
   * Validates the MIME types of the uploaded files.
   */
  validateFilesMimeType(
    files: Express.Multer.File[],
    allowedMimeTypes: string[],
  ): void {
    for (const file of files) {
      if (!file.mimetype) {
        throw new BadRequestException('File type is missing');
      }

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `Invalid file type: ${file.mimetype}. Allowed types are: ${allowedMimeTypes.join(', ')}`,
        );
      }
    }
  }

  /**
   * Validates the total size of the uploaded files.
   */
  validateFilesSize(
    input: Express.Multer.File | Express.Multer.File[],
    maxFilesSize: number = 5 * 1024 * 1024,
  ): void {
    if (Array.isArray(input)) {
      const filesSizeSum = input.reduce((totalSize, file) => {
        if (!file.size) {
          throw new BadRequestException('File size is missing');
        }
        return totalSize + file.size;
      }, 0);

      if (filesSizeSum > maxFilesSize) {
        throw new BadRequestException(
          `Total file size exceeds the limit of ${maxFilesSize / (1024 * 1024)} MB`,
        );
      }
    } else {
      if (!input.size) {
        throw new BadRequestException('File size is missing');
      }

      if (input.size > maxFilesSize) {
        throw new BadRequestException(
          `File size exceeds the limit of ${maxFilesSize / (1024 * 1024)} MB`,
        );
      }
    }
  }

  /**
   * Sanitizes a CSV field to prevent formula injection attacks.
   * If the field starts with '=', '+', '-', or '@', it prepends a single quote (')
   * to the value to treat    await this.saveQuestions(sanitized);
   * it as a string in CSV format.
   */
  sanitizeCsvFields<T>(value: T): T {
    if (!value) return '' as T;
    const dangerousStart = ['=', '+', '-', '@'];
    return dangerousStart.includes(String(value)[0])
      ? (`'${String(value)}` as T)
      : value;
  }
}
