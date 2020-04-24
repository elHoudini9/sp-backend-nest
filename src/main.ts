import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import { NormalizeInterceptor } from './interceptors/Normalize'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.enableCors()
  app.useGlobalInterceptors(new NormalizeInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
