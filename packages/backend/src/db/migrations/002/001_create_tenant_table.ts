import type { Knex } from 'knex';
import { addCommonColumns } from '../../common-columns';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tenant', (table) => {
    addCommonColumns(table, knex);

    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');

    table.index(['id'], 'idx_tenant_user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('tenant');
}
