import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dbConfig } from './config/db'
import { AuthModule } from './auth/auth.module'
import { SafePlacesModule } from './safeplaces/safeplaces.module'

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, SafePlacesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
