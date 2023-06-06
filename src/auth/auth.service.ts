import { Inject, Injectable, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt"
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";
require('dotenv').config();
@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService, private userService: UserService){}
    async authenticateUser(userDto: UserDto): Promise<object>{
        const payload = { sub: userDto.id, username: userDto.username };
        this.userService.createUser(userDto);
        return ({
            refresh_token: await this.jwtService.signAsync(payload, {
                expiresIn: '3d',
                secret: process.env.TOKEN_SECRET,
            }),
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '10m',
                secret: process.env.TOKEN_SECRET,
            }), 
        });
        
    }
    async findUserById(userId: number) : Promise<object>{
        return (await this.userService.findUserById(userId));
    }
}
