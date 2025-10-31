import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { type Request } from "express";
import { TodoDto } from "./dto/todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todo")
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Req() req: Request){
        return await this.todoService.get(req.user.id)
    }

    @Get("all")
    async getAll(){
        return await this.todoService.getAll()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req: Request, @Body() todo: TodoDto){
        console.log(req.user)
        return await this.todoService.create(req.user.id, todo.task)
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async update(@Req() req: Request, @Body() updateTodo: UpdateTodoDto){
        return await this.todoService.update(req.user.id, updateTodo)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param("id") id: string, @Req() req: Request){
        return this.todoService.delete(id, req.user.id)
    }
}