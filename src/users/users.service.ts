import { Inject, Injectable } from '@nestjs/common'
import { REPOSITORIES } from '../config/constants'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORIES.USER)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } })
  }

  async create(username: string, password: string): Promise<User> {   
    const user = this.userRepository.create({ username, password })
    return this.userRepository.save(user)
  }
}
