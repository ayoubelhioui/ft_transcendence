import { Inject, Injectable, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt"
import { UserDto } from "src/user/user.dto";
require('dotenv').config();
@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService){}
    async createUser(userDto: UserDto): Promise<object>{
        console.log(userDto.id, userDto.username);
        const payload = { sub: userDto.id, username: userDto.username };
        return ({
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '1m',
                secret: process.env.TOKEN_SECRET,
            }), 
        });
    }
}
