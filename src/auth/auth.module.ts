import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepo } from './typeorm/repositories/user.repository'
import { appConfig } from '../config/app'
import { JwtStrategy } from './passport/jwt.strategy'

const { secret, expiresIn } = appConfig.jwt

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn }
    }),
    TypeOrmModule.forFeature([UserRepo])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
