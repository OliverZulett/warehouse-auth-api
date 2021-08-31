import path from 'path';
import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
  name: 'warehouse',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
  synchronize: true,
};

export default dbConfig;
