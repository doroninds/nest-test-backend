import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateArticleDto,
  FilterOptionsDto,
  PageDto,
  PageMetaDto,
  PageOptionsDto,
  UpdateArticleDto,
} from './article.dto'
import { REPOSITORIES } from '../config/constants'
import { Repository } from 'typeorm'
import { Article } from './entities/article.entity'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ERROR_MESSAGES } from 'src/config/errors'

@Injectable()
export class ArticleService {
  constructor(
    @Inject(REPOSITORIES.ARTICLE)
    private readonly articleRepository: Repository<Article>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(userId: number, createArticleDto: CreateArticleDto) {
    const exist = await this.articleRepository.findOne({ where: { title: createArticleDto.title } })
    if (exist) {
      throw new HttpException(ERROR_MESSAGES.DUPLICATE_ARTICLE_TITLE, HttpStatus.BAD_REQUEST)
    }
    const entity = { userId, ...createArticleDto }
    const article = await this.articleRepository.save(entity)
    await this.cacheService.set(article.id.toString(), article)
    return article
  }

  async createBatch(userId: number, createArticleDtos: CreateArticleDto[]) {
    const articles = []

    for (const createArticleDto of createArticleDtos) {
      const article = await this.create(userId, createArticleDto)
      articles.push(article)
    }

    return articles
  }

  async findAndCountAll(pageOptionsDto: PageOptionsDto, filterOptionsDto: FilterOptionsDto): Promise<PageDto<Article>> {
    const queryBuilder = this.articleRepository.createQueryBuilder('article')

    queryBuilder
      .where(filterOptionsDto)
      .orderBy('article.publishedAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)

    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities()

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(entities, pageMetaDto)
  }

  async findOne(id: number) {
    const cachedArticle = await this.getCachedArticle(id)

    if (cachedArticle) {
      return cachedArticle
    }

    const article = await this.articleRepository.findOne({ where: { id } })

    if (!article) {
      throw new NotFoundException()
    }

    await this.cacheService.set(id.toString(), article)

    return article
  }

  async update(id: number, userId: number, updateArticleDto: UpdateArticleDto) {
    await this.checkUserAccess(id, userId)
    const result = await this.articleRepository.update(id, updateArticleDto)
    await this.invalidateCacheByArticleId(id)
    return result
  }

  async remove(id: number, userId: number) {
    await this.checkUserAccess(id, userId)
    const result = await this.articleRepository.delete(id)
    await this.invalidateCacheByArticleId(id)
    return result
  }

  /**
   * Check if user have access to edit/delete article
   * @param id
   * @param userId
   */
  private async checkUserAccess(id: number, userId: number): Promise<void> {
    let article = await this.getCachedArticle(id)

    if (!article) {
      article = await this.articleRepository.findOne({ select: ['id', 'userId'], where: { id } })
    }

    if (!article) {
      throw new NotFoundException()
    }

    if (article.userId !== userId) {
      throw new ForbiddenException()
    }
  }

  /**
   * Invalidate article cache by id key
   */
  private async invalidateCacheByArticleId(id: number): Promise<void> {
    return this.cacheService.del(id.toString())
  }

  /**
   * Invalidate article cache by id key
   */
  private async getCachedArticle(id: number): Promise<Article> {
    return this.cacheService.get<Article>(id.toString())
  }
}
