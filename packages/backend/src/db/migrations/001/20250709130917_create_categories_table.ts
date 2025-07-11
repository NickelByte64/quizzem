import type { Knex } from 'knex';
import { addCommonColumns } from '../../common-columns';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('category_group', (table) => {
    addCommonColumns(table, knex);

    table.string('name').notNullable().unique();
    table.string('description').nullable().defaultTo(null);
  });

  await knex.schema.createTable('category', (table) => {
    addCommonColumns(table, knex);

    table.string('name').notNullable().unique();
    table.string('description').nullable().defaultTo(null);

    table
      .uuid('group_id')
      .notNullable()
      .references('id')
      .inTable('category_group')
      .onDelete('CASCADE');

    table.index(['group_id'], 'idx_category_group_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('category');
  await knex.schema.dropTableIfExists('category_group');
}
