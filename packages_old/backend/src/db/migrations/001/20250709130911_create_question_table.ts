import type { Knex } from 'knex';
import { QuestionType } from '../../../question/dto/question-type.enum';
import { addCommonColumns } from '../../common-columns';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('question', (table) => {
    addCommonColumns(table, knex);

    table.string('question').notNullable().unique();
    table
      .string('questionType')
      .defaultTo(QuestionType.MULTIPLE_CHOICE)
      .notNullable();
    table.string('correctAnswer').notNullable();
    table.string('answers').nullable().defaultTo(null);

    table.index(['id'], 'idx_question_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('question');
}
