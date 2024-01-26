import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto, AuthRegisterDto } from './auth.dto'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto.username, dto.password)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto.username, dto.password)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user
  }
}
