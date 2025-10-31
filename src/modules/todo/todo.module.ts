import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo]),
        UserModule
    ],
    providers: [TodoService],
    controllers: [TodoController],
})
export class TodoModule{}