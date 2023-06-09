import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { TokensDto } from "src/dto/tokens.dto";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService, private userService: UserService){}
    private payload: object;
    
    async authenticateUser(userDto: UserDto): Promise<object> {
        this.payload = { sub: userDto.IntraId, username: userDto.username };
        this.userService.createUser(userDto);
        return ({
            tokens: {
                refresh_token: await this.generateNewToken('1m'),
                access_token: await this.generateNewToken('10m'),
            },
            userDto,
        });
    }

    async generateNewToken(expiringTime: string) : Promise<string> {
        return (
            await this.jwtService.signAsync(this.payload, {
                expiresIn: expiringTime,
                secret: process.env.TOKEN_SECRET,
            })
        );
    }

    async findUserById(intraId: number) : Promise<object> {
        return (await this.userService.findUserById(intraId));
    }

    async removeTokens(accessToken: string, refreshToken: string){
        await this.userService.addingTokensToBlacklist(accessToken, refreshToken);
    }

    async isTokenInBlacklist(token: string): Promise<boolean> {
        return (await this.userService.accessTokenInBlacklist(token));
    }
}

