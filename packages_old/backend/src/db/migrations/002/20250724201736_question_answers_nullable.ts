import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('question', (table) => {
    table.string('answers').nullable().defaultTo(null).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('question', (table) => {
    table.string('answers').notNullable().alter();
  });
}
