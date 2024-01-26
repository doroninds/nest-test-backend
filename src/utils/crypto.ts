import { scryptSync } from 'node:crypto'
import env from '../config/env'

if (!env.CRYPTO_HASH_SALT) throw new Error('CRYPTO_HASH_SALT NOT SET!')

// CPU/memory cost parameter. Must be a power of two greater than one
const PASSWORD_HASH_COST = 1024 * 4
const PASSWORD_HASH_BLOCK_SIZE = 16
const PASSWORD_HASH_SALT = env.CRYPTO_HASH_SALT
const PASSWORD_KEY_LENGTH = 64

export const hashPassword = (password: string) =>
  scryptSync(password, PASSWORD_HASH_SALT, PASSWORD_KEY_LENGTH, {
    cost: PASSWORD_HASH_COST,
    blockSize: PASSWORD_HASH_BLOCK_SIZE,
  }).toString('hex')
