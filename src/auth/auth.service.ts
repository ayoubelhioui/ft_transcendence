import { Inject, Injectable, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt"
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";
// require('dotenv').config();
@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService, private userService: UserService){}
    private payload: object;
    
    // member function
    async authenticateUser(userDto: UserDto): Promise<object>{
        this.payload = { sub: userDto.IntraId, username: userDto.username };
        this.userService.createUser(userDto);
        return ({
            tokens:{
                refresh_token: await this.generateNewToken('1m'),
                access_token: await this.generateNewToken('10m'),
            },
            userDto,
        });
    }

    // member function
    async generateNewToken(expiringTime: string) : Promise<string>{
        return (
            await this.jwtService.signAsync(this.payload, {
                expiresIn: expiringTime,
                secret: process.env.TOKEN_SECRET,
            })
        );
    }

    // member function
    async findUserById(intraId: number) : Promise<object>{
        return (await this.userService.findUserById(intraId));
    }

    async removeTokens(refreshToken: string, accessToken: string){
         await this.generateNewToken('1s');
    }
}

