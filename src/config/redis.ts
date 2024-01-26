import { CacheModuleAsyncOptions } from '@nestjs/cache-manager'
import env from './env'
import { redisStore } from 'cache-manager-redis-store'

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      url: env.REDIS_URL,
    })
    return {
      store: () => store,
    }
  },
}
