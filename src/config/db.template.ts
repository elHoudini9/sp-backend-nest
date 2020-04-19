import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // change to a valid username
  password: 'postgres', // change to a valid username
  database: 'safeplaces', // change to a valid database
  // schema: 'some_schema', // uncomment if needed
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true // turn OFF for production
}
