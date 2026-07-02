import { join } from 'node:path';
import { DataSourceOptions } from 'typeorm';

export const DB_CONNECTION_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'quizzem',
};

export const migrationsGlob = join(__dirname, 'migrations/*.{js,ts}');
