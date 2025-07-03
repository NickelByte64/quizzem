import * as dotenv from 'dotenv';
import { ENTITIES_LIST } from 'src/db/entities-list';
import { DataSource } from 'typeorm';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ENTITIES_LIST,
  migrations: ['src/db/migrations/*.ts'],
});
