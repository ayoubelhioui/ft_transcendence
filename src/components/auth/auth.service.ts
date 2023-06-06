import { Inject, Injectable, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { CreateUserDto } from "src/components/user/user.dto";
require('dotenv').config();
@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService){}
    
    async createUser(userDto: CreateUserDto): Promise<object>{
        const payload = { sub: userDto.id, username: userDto.username };
        return ({
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '1m',
                secret: process.env.TOKEN_SECRET,
            }), 
        });
    }
}
