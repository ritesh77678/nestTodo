import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UserRegisterDto } from "./dto/user-register-dto";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login-dto";
import { type Response } from "express";

@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService){}

    @Get()
    dummyApi(){
        return "auth controller"
    }

    @Post("register")
    regiser(@Body() user: UserRegisterDto){
        return this.authService.register(user)
    }

    @Post("login")
    login(@Body() user: UserLoginDto, @Res() res: Response){
        return this.authService.login(user, res)
    }
}