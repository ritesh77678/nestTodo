import { IsNotEmpty } from "class-validator";

export class TodoDto {

    @IsNotEmpty()
    task: string
}