import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user-dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import type { Request } from "express";

interface myRequest extends Request {
    user: {
        id: string,
        email: string
    }
}

@Controller("user")
export class UserController {
    
    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async update(@Body() updateUser: UpdateUserDto, @Req() req: Request){
        console.log(req.user.id)
        return this.userService.updateUser(updateUser, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async get(@Req() req: myRequest){
        return this.userService.get(req.user.id);
    }

    @Get()
    async getAll(){
        return this.userService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param() id: string){
        return this.userService.delete(id)
    }
}