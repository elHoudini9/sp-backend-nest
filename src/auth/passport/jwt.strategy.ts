import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { appConfig } from '../../config/app'
import { JwtPayload } from '../types/jwt-payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepo } from '../typeorm/repositories/user.repository'
import { UnauthorizedException } from '@nestjs/common'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepo)
    private userRepo: UserRepo
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.jwt.secret
    })
  }
  async validate(payload: JwtPayload) {
    const { username } = payload
    const user = await this.userRepo.findOne({ username })

    if (!user) {
      throw new UnauthorizedException('Not logged in')
    }

    return user
  }
}
