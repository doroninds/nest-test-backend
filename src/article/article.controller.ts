import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto, FilterOptionsDto, PageOptionsDto, UpdateArticleDto } from './article.dto'
import { AuthGuard } from '../auth/auth.guard'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
    const userId = req.user.sub
    return this.articleService.create(userId, createArticleDto)
  }

  @UseGuards(AuthGuard)
  @Post('/batch')
  createBatch(@Request() req, @Body() createArticleDtoBatch: CreateArticleDto[]) {
    const userId = req.user.sub
    return this.articleService.createBatch(userId, createArticleDtoBatch)
  }

  @Get()
  findAndCountAll(@Query() pageOptionsDto: PageOptionsDto, @Query() filterOptionsDto: FilterOptionsDto) {
    return this.articleService.findAndCountAll(pageOptionsDto, filterOptionsDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    const userId = req.user.sub
    return this.articleService.update(+id, userId, updateArticleDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub
    return this.articleService.remove(+id, userId)
  }
}
