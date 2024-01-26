import { configDotenv } from 'dotenv'
import logger from '../utils/logger'
configDotenv()

const env = {
  APP_PORT: parseInt(process.env.APP_PORT) || 3000,
  DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
  CRYPTO_HASH_SALT: process.env.CRYPTO_HASH_SALT,
  REDIS_URL: process.env.REDIS_URL,
}

Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    logger.warn(`💩 Oh! You forgot set process.env.${key} value!`)
  }
})

export default env
