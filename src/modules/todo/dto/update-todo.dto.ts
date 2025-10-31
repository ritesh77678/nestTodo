import { IsNotEmpty, IsString } from "class-validator"

export class UpdateTodoDto {

    @IsString({message: "id should be string"})
    id: string

    @IsNotEmpty({message: "Task cannot be empty"})
    task: string
}