import { Inject, Injectable, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { CreateUserDto } from "src/components/user/dto/user.dto";
import { UserService } from '../user/user.service';
import { User } from "src/database/entities";
require('dotenv').config();
@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService : UserService
        ){}
    
    async createUser(userDto: CreateUserDto): Promise<object>{
        const payload = { sub: userDto.id, username: userDto.username };
        return ({
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '0m',
                secret: "khalid",
            }), 
        });
    }
    private async createDefaultUser(id) : Promise<User> {
        const user = {id : id, username : 'test'};
        return this.userService.createUser(user);
    }

    async getAccesToken(id : number) {
        let user : User = null;
        user = await this.userService.findUserById(id);
        if (!user)
            user = await this.createDefaultUser(id);
        console.log(user);
        const payload = { sub: user.id, ...user};
        return ({
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '3000m',
                secret: "khalid",
            }), 
        });
    }
}
