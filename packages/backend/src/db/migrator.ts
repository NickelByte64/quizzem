import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import { join, resolve } from 'path';

dotenv.config({ path: join(process.cwd(), '../../../..', '.env.development') });

const migrationsDirs = ['001'].map((ver) =>
  resolve(__dirname, 'migrations', ver),
);

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: migrationsDirs,
    extension: 'ts',
  },
};

export default knexConfig;
