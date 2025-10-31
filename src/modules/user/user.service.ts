import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user-dto";
import { ApiResponse } from "src/common/utils/ApiResponse";
import { Request } from "express";

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

    async updateUser(updateData: UpdateUserDto, id: string){
        
        if (!(await this.userRepo.findOne({where: {id}}))) throw new NotFoundException("User does not exist with the corresponding id")

        const existingUser = await this.userRepo.findOne({where: {id}})
        if (!existingUser) throw new NotFoundException("User does not exist with the corresponding id")

        if (updateData.username){
            const userWithSameUsername = await this.userRepo.findOne({where: {username: updateData.username}}) 
            if (userWithSameUsername && userWithSameUsername.id != id) throw new ConflictException("Username is already used")
        }
        
        if (updateData.email){
            const userWithSameEmail = await this.userRepo.findOne({where: {email: updateData.email}})
            if (userWithSameEmail && userWithSameEmail.id != id) throw new ConflictException("Email is already used")
        }
        
        await this.userRepo.update(
            {id},
            updateData    
        )

        const updatedUser = await this.userRepo.findOne({where: {id}})
        if(!updatedUser) throw new InternalServerErrorException("Something went wrong, please try again")
        
        return new ApiResponse<User>(200, updatedUser, "User updated successfully")
    }


    async get(id: string){
        const user = await this.userRepo.findOne({
            where: {id}
        })

        if(!user) throw new NotFoundException("User not found with the provided id")

        return new ApiResponse<User>(200, user)
    }

    async getAll(){
        const response = await this.userRepo.find()
        
        if(!response.length) throw new NotFoundException("Cannot find any user")

        return new ApiResponse<User[]>(200, response, "List of users")
    }

    async delete(id: string){
        const response = await this.userRepo.delete(id)
        
        if (!response.affected) throw new NotFoundException("User does not exist with the provided id")
        
        return new ApiResponse<null>(200, null, "User deleted")
    }
}