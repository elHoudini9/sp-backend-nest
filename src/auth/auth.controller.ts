import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { User } from './typeorm/entities/user.entity'
import { AdminGuard } from './guards/admin'
import { ValidateDto } from './types/payload/validate'
import { LoginDto } from './types/payload/login'
import { RegisterDto } from './types/payload/register'
import { ChangePasswordDto } from './types/payload/change-password'
import { GetUser } from './decorators/get-user'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/bootstrap')
  bootstrap(): Promise<boolean> {
    return this.authService.bootstrap()
  }

  @Post('/validate')
  validate(
    @Body(ValidationPipe) authValidateDto: ValidateDto
  ): Promise<{
    username: string
    needs2fa: boolean
    qrCodeUrl?: string
    secret2fa?: string
  }> {
    return this.authService.validateCredentials(authValidateDto)
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authLoginDto: LoginDto
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authLoginDto)
  }

  @Post('/register')
  @UseGuards(AuthGuard(), AdminGuard)
  register(
    @Body(ValidationPipe) registerDto: RegisterDto
  ): Promise<{ username: string; qrCodeUrl: string }> {
    return this.authService.register(registerDto)
  }

  @Post('/updatePassword')
  @UseGuards(AuthGuard())
  updatePassword(
    @GetUser() user,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<string> {
    return this.authService.updatePassword(user.id, changePasswordDto)
  }

  @Get('/users')
  @UseGuards(AuthGuard(), AdminGuard)
  listUsers(): Promise<[User[], number]> {
    return this.authService.getUsers()
  }
}
