import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config({ path: '.env' });

console.log('*******************************');
console.log('*******************************');
console.log(process.env.DB_HOST);
console.log('*******************************');
console.log('*******************************');
const dataSource = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  dropSchema: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: process.env.NODE_ENV === 'development',
};

export const connectionSource = new DataSource(dataSource as DataSourceOptions);
