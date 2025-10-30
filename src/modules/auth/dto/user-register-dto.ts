import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class UserRegisterDto {

    @IsNotEmpty({message: "username is required"})
    username: string

    @IsEmail({}, {message: "Invalid email"})
    email: string

    @IsNotEmpty({message: "Password is required"})
    @MinLength(6, {message: "password is too short"})
    password: string
}