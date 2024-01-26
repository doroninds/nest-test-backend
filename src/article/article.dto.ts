import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { SortDirection } from '../@types'
import { DB_DEFAULT_TAKE_ROWS, DB_MAX_TAKE_ROWS } from '../config/constants'

export class CreateArticleDto {
  title: string
  description: string
  topic: string
  publishedAt: Date
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}


export class FilterOptionsDto {
  userId: number
  topic: string
}

export class PageDto<T> {
  @IsArray()
  readonly data: T[]

  readonly meta: PageMetaDto

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data
    this.meta = meta
  }
}

export class PageMetaDto {
  readonly page: number
  readonly take: number
  readonly itemCount: number
  readonly pageCount: number
  readonly hasPreviousPage: boolean
  readonly hasNextPage: boolean

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page
    this.take = pageOptionsDto.take
    this.itemCount = itemCount
    this.pageCount = Math.ceil(this.itemCount / this.take)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}

export class PageOptionsDto {
  @IsEnum(SortDirection)
  readonly order?: SortDirection = SortDirection.DESC

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(DB_MAX_TAKE_ROWS)
  @IsOptional()
  readonly take?: number = DB_DEFAULT_TAKE_ROWS

  get skip(): number {
    return (this.page - 1) * this.take
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto
  itemCount: number
}
