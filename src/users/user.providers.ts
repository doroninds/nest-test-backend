import { DataSource } from 'typeorm'
import { User } from './user.entity'
import { DATA_SOURCES, REPOSITORIES } from '../config/constants'

export const userProviders = [
  {
    provide: REPOSITORIES.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCES.POSTGRES],
  },
]
