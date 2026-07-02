import { CommonColumns } from 'src/core/db/common-columns';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddAnswersTable1782986261491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          ...CommonColumns.getAll(),
          { name: 'text', type: 'text' },
          {
            name: 'is_correct_answer',
            type: 'boolean',
            default: false,
          },
          { name: 'question_id', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'answers',
      new TableForeignKey({
        columnNames: ['question_id'],
        referencedTableName: 'questions',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('answers');
  }
}
