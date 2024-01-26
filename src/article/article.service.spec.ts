import { Test, TestingModule } from '@nestjs/testing'
import { ArticleService } from './article.service'
import { articleProviders } from './article.providers'
import { CacheModule } from '@nestjs/cache-manager'
import { DatabaseModule } from '../database/database.module'

describe('ArticleService', () => {
  let service: ArticleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule, DatabaseModule],
      providers: [ArticleService, ...articleProviders],
    }).compile()

    service = module.get<ArticleService>(ArticleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
