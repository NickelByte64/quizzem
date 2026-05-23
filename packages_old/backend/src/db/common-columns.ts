import { type Knex } from 'knex';

export function addCommonColumns(
  table: Knex.CreateTableBuilder,
  knex: Knex,
): void {
  table.uuid('id').primary();
  table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
}
