import knexBuilder from 'knex';

// const DB_FILE_LOCATION = resolve(import.meta.dirname, './db.sqlite3');

// const verboseSqlite3 = sqlite3.verbose();
// export const DB = new verboseSqlite3.Database(DB_FILE_LOCATION);

const knex = knexBuilder({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './db.sqlite3',
  },
});

export { knex };

export async function initDb(): Promise<void> {
  const exists = await knex.schema.hasTable('game_room');
  if (!exists) {
    await knex.schema.createTable('game_room', (table) => {
      table.uuid('id', { primaryKey: true });
      table.string('name');
    });
  }
  console.log('knex is initialized');
}
