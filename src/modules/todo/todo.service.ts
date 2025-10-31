import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";
import { UserService } from "../user/user.service";
import { Repository } from "typeorm";
import { InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ApiResponse } from "src/common/utils/ApiResponse";
import { UpdateTodoDto } from "./dto/update-todo.dto";

export class TodoService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
        private readonly userService: UserService
    ){}

    async create(userId: string, task: string){
        
        userId = "123"
        await this.userService.get(userId)
        
        const createTodo = this.todoRepo.create({
            task,
            user: userId
        })

        const result = await this.todoRepo.save(createTodo)
        
        return new ApiResponse(201, result, "Todo created")
    }

    async update(userId: string, updateTodo: UpdateTodoDto){

        const {data: existingUser} = await this.userService.get(userId)
        const existingTodo = await this.todoRepo.findOne({where: {id: updateTodo.id}})

        if (!existingTodo) throw new NotFoundException("Todo not found with the provided id")

        if (existingTodo.user != existingUser.id) throw new UnauthorizedException("Invalid operation")

        const updatedTodo = await this.todoRepo.preload({
            id: existingTodo.id,
            task: updateTodo.task
        })

        if (!updatedTodo) throw new InternalServerErrorException("Internal Server Error")

        const result = await this.todoRepo.save(updatedTodo)
        return new ApiResponse<Todo>(200, result, "Todo updated")
    }

    async get(userId: string){

        await this.userService.get(userId)

        const todos = await this.todoRepo.find({where: {user: userId}})

        return new ApiResponse<Todo[]>(200, todos, "List of Todos")
    }
    
    async getAll(){
        
        const todos = await this.todoRepo.find()
        return new ApiResponse<Todo[]>(200, todos, "List of Todos")
    }

    async delete(id: string, userId: string){

        const {data: user} = await this.userService.get(userId)
                
        const existingTodo = await this.todoRepo.findOne({where: {id}})
        if (!existingTodo) throw new NotFoundException("Todo not found")

        if (existingTodo.user != user.id) throw new UnauthorizedException("Unauthorize operation")

        await this.todoRepo.delete(id)

        return new ApiResponse<null>(200, null, "todo deleted")
    }
}