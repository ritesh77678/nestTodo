import { IsEmail, MinLength } from "class-validator"

export class UserLoginDto {

    @IsEmail({}, {message: "Invalid email"})
    email: string

    @MinLength(6, {message: "Password is too short"})
    password: string
}