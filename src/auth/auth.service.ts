import { Inject, Injectable, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt"
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";
require('dotenv').config();
@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService, private userService: UserService){}
    private payload: object;
    async authenticateUser(userDto: UserDto): Promise<object>{
        this.payload = { sub: userDto.IntraId, username: userDto.username };
        this.userService.createUser(userDto);
        return ({
            refresh_token: await this.generateNewToken('10d'),
            access_token: await this.generateNewToken('10m')
        });
    }

    async generateNewToken(expiringTime: string) : Promise<string>{
        return (
            await this.jwtService.signAsync(this.payload, {
                expiresIn: expiringTime,
                secret: process.env.ACCESS_TOKEN_SECRET,
            })
        );
    }

    async findUserById(intraId: number) : Promise<object>{
        return (await this.userService.findUserById(intraId));
    }

    isRefreshTokenValid(refreshToken: string): boolean{
        return (true);
    }
}
