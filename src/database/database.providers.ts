import { DATA_SOURCES } from '../config/constants'
import { dbDatasource } from '../config/typeorm'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: DATA_SOURCES.POSTGRES,
    useFactory: async () => {
      const dataSource = new DataSource(dbDatasource)
      return dataSource.initialize()
    },
  },
]
