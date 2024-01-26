import { DataSource } from 'typeorm'
import { Article } from './entities/article.entity'
import { DATA_SOURCES, REPOSITORIES } from '../config/constants'

export const articleProviders = [
  {
    provide: REPOSITORIES.ARTICLE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
    inject: [DATA_SOURCES.POSTGRES],
  },
]
