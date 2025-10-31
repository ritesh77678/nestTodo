import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { Todo } from './modules/todo/todo.entity';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Todo],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
