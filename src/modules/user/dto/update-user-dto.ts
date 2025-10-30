import { IsEmail, IsString } from "class-validator"

export class UpdateUserDto {

    @IsString()   
    username: string

    @IsEmail({}, {message: "Invalid Email"})
    email: string
}