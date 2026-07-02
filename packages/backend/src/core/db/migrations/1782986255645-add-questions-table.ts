import { CommonColumns } from 'src/core/db/common-columns';
import { AnswerModeEnum } from 'src/features/question/model/answer-mode';
import { MediaTypeEnum } from 'src/features/question/model/media-type';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddQuestionsTable1782986255645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          ...CommonColumns.getAll(),
          { name: 'text', type: 'text' },
          {
            name: 'answer_mode',
            type: 'enum',
            enum: Object.values(AnswerModeEnum),
            default: `'${AnswerModeEnum.SINGLE_CHOICE}'`,
          },
          {
            name: 'media_type',
            type: 'enum',
            enum: Object.values(MediaTypeEnum),
            default: `'${MediaTypeEnum.NONE}'`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions');
  }
}
