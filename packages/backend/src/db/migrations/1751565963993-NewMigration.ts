import { COMMON_COLUMNS } from 'src/db/migrations/common-columns';
import { QuestionType } from 'src/question/dto/question-type.enum';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class NewMigration1751565963993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question',
        columns: [
          ...COMMON_COLUMNS,
          { name: 'question', type: 'varchar' },
          {
            name: 'questionType',
            type: 'varchar',
            length: '64',
            default: QuestionType.MULTIPLE_CHOICE,
          },
          { name: 'correctAnswer', type: 'varchar' },
          { name: 'answers', type: 'varchar', isNullable: true, default: null },
        ],
      }),
    );

    await queryRunner.createIndex(
      'question',
      new TableIndex({
        name: 'IDX_QUESTION_ID',
        columnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question');

    await queryRunner.dropIndex('question', 'IDX_QUESTION_ID');
  }
}
