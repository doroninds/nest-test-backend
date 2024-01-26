import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CacheModule } from '@nestjs/cache-manager'
import { RedisOptions } from './config/redis'


@Module({
  imports: [CacheModule.registerAsync(RedisOptions), ArticleModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
