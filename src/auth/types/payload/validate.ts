import { IsString } from 'class-validator'

export class ValidateDto {
  @IsString()
  username: string

  @IsString()
  password: string
}
