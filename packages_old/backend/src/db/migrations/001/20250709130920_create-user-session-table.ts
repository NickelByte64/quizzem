import type { Knex } from 'knex';
import { addCommonColumns } from '../../common-columns';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    addCommonColumns(table, knex);

    table.string('userName').notNullable().unique();
    table.string('password').notNullable();
    table.string('refreshToken').nullable().defaultTo(null);
  });

  await knex.schema.createTable('session', (table) => {
    addCommonColumns(table, knex);

    table.timestamp('expiredAt').notNullable().defaultTo(knex.fn.now());
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');

    table.index(['user_id'], 'idx_user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user');
  await knex.schema.dropTableIfExists('session');
}
