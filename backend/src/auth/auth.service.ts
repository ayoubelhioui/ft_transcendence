import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { TokensDto } from "src/dto/tokens.dto";
import { UserDto } from "src/dto/user.dto";
import TokenBlacklist from "src/entities/token_blacklist";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService, private userService: UserService){}
    private payload: object;
    private user: object;
    async authenticateUser(userDto: UserDto): Promise<object> {
        if (!await this.findUserById(userDto.IntraId))
            this.userService.createUser(userDto);
        this.payload = { sub: userDto.IntraId, username: userDto.username };
        return (await this.generateAuthTokens());
    }

    async generateNewToken(expiringTime: string) : Promise<string | undefined> {
        return (
            await this.jwtService.signAsync(this.payload, {
                expiresIn: expiringTime,
                secret: process.env.TOKEN_SECRET,
            })
        );
    }

    async findUserById(intraId: number) : Promise<object | undefined> {
        return (await this.userService.findUserById(intraId));
    }

    async removeTokens(accessToken: string, refreshToken: string){
        await this.userService.addTokenToBlacklist(accessToken);
        await this.userService.addTokenToBlacklist(refreshToken);
    }

    async isTokenInBlacklist(token: string): Promise<TokenBlacklist | undefined> {
        return (await this.userService.accessTokenInBlacklist(token));
    }

    async mailingUser(userMail: string): Promise<string> {
        const emailVerificationCode: string = await this.generateNewToken('3m');
        await this.userService.sendEmail(emailVerificationCode, userMail);
        return (emailVerificationCode);
    }

    async generateAuthTokens(): Promise<object>{
        return ({
            access_token: await this.generateNewToken('10m'),
            refresh_token: await this.generateNewToken('10d'),
        });
    }
}

