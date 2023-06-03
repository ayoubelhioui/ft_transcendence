import { Injectable, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UserDto } from "src/user/user.dto";

Injectable({})
export class AuthService{
    constructor(private jwtService: JwtService){}
    async createUser(userDto: UserDto): Promise<object>{
        const payload = { sub: userDto.id, username: userDto.username };
        return ({
            access_token: await this.jwtService.signAsync(payload),
        });
    }
}
