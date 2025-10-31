import { ConflictException, Injectable, NotAcceptableException, NotFoundException, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { UserRegisterDto } from "./dto/user-register-dto";
import bcrypt from 'bcrypt'
import { UserLoginDto } from "./dto/user-login-dto";
import { JwtService } from "@nestjs/jwt";
import { type Response } from "express";
import { ApiResponse } from "src/common/utils/ApiResponse";

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService
    ){}

    async register(user: UserRegisterDto){

        const existingUserWithEmail = await this.userRepo.findOne({
            where: [
                {email: user.email},
            ]
        })

        if (existingUserWithEmail) throw new ConflictException("User already exist with the email")

        const existingUserWithUsername = await this.userRepo.findOne({
            where: [
                {username: user.username},
            ]
        })

        if (existingUserWithUsername) throw new ConflictException("User already exist with the username")


        const newUser = await this.userRepo.create({
            email: user.email,
            username: user.username,
            password: await bcrypt.hash(user.password, 5)
        })

        const {password, ...savedUser} = await this.userRepo.save(newUser)

        return new ApiResponse(201, savedUser, "User registered successfully")
    }

    async login(user: UserLoginDto, res: Response){

        const existingUser = await this.userRepo
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", {email: user.email})
            .getOne()

        if (!existingUser) throw new NotFoundException("User not found")

        const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password)
        if(!isPasswordCorrect) throw new NotAcceptableException("Incorrect Password")

        const payload = {id: existingUser.id, email: existingUser.email}
        const accessToken = this.jwtService.sign(payload)

        const {password, ...userObj} = existingUser

        return res.status(200).cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600 * 1000
        }).json({
            message: "login successfull",
            user: userObj
        })
    }
}