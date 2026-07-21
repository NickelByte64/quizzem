import { join } from 'node:path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DB_CONNECTION_OPTIONS, migrationsGlob } from './db.config';

export default new DataSource({
  ...DB_CONNECTION_OPTIONS,
  entities: [join(__dirname, '../../**/*.model.{js,ts}')],
  migrations: [migrationsGlob],
});
