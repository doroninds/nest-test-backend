import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ERROR_MESSAGES } from '../config/errors'
import { hashPassword } from '../utils/crypto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByUsername(username)

    if (user.password !== hashPassword(password)) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id }
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      accessToken,
    }
  }

  async register(username: string, password: string): Promise<{ accessToken: string }> {
    const exist = await this.usersService.findByUsername(username)

    if (exist) {
      throw new HttpException(ERROR_MESSAGES.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST)
    }
    password = hashPassword(password)
    const user = await this.usersService.create(username, password)

    const payload = { sub: user.id }
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      accessToken,
    }
  }
}
