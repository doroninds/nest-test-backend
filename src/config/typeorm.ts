import { DataSource, DataSourceOptions } from 'typeorm'
import env from './env'
export const dbDatasource: DataSourceOptions = {
  type: 'postgres',
  url: env.DATABASE_CONNECTION_STRING,
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl: false,
  synchronize: false,
}

const dataSource = new DataSource(dbDatasource)
export default dataSource
