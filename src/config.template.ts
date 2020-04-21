import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const jwtConfig = {
  secret: '$b8La3@fn7M!&Gato%Xag12zA4@1k#', // Please change the secret to something else that is also secure
  expiresIn: 3600 // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
}

// Database Configuration
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
