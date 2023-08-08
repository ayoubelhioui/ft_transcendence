import { ForbiddenException, Injectable, NotFoundException, Redirect } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { host_client_address, twoFactorSecretCryptoKey } from "src/Const";
import { UserDto } from "src/global/dto/user.dto";
import TokenBlacklist from "src/database/entities/token_blacklist";
import { UserService } from "src/components/user/user.service";
import * as otplib from 'otplib';
import { PasswordService } from "../channels/password.service";
import { authTwoFactorVerifyDto } from "./dto/auth.two-factor-verify.dto";
import { User } from "src/database/entities";
import { IUserIntra } from "./intefaces/user.intra.interface";
import { IUserGoogle } from "./intefaces/user.google.interface";
const SimpleCrypto = require("simple-crypto-js").default;


@Injectable()
export class AuthService{
    //private payload: object;
    //private userInfo: any;
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private passwordService: PasswordService) { }
    
    
    async signUpByIntra(userInfo : IUserIntra) {
        console.log("info = " , userInfo);
        const user = await this.userService.findUserByIntraId(userInfo.IntraId)
        if (!user)
        {
            const newUser : UserDto = {
                username : userInfo.username,
                IntraId : userInfo.IntraId
            }
            return await this.userService.createUser(newUser);
        }
        return (user);
    }
    async signUpByGoogle(userInfo : IUserGoogle) {
        const user = await this.userService.findUserByEmail(userInfo.email)
        if (!user)
        {
            const newUser : UserDto = {
                username : userInfo.name,
                email : userInfo.email
            }
            return await this.userService.createUser(newUser);
        }
        return (user);
    }


    async authenticate(user: User, res: any, redirect : boolean) : Promise<void> {
        const payload = { sub: user.id, username: user.username };

        const tokens = await this.generateAuthTokens(payload);
        if (!redirect) {
            res.status(200).json({
                accessToken : tokens['access_token'],
                refreshToken : tokens['refresh_token'],
           })
        } else {
            res.cookie('access_token', tokens['access_token']);
            res.cookie('refresh_token', tokens['refresh_token']);
            res.redirect(`http://${host_client_address}/`);
        }
    }
    
    async generateNewToken(payload: object, expirationTime: string) : Promise<string | undefined> {
        return (
            await this.jwtService.signAsync(payload, {
                expiresIn: expirationTime,
                secret: process.env.TOKEN_SECRET,
            })
        );
    }


    async findUserById(id: number) : Promise<object | undefined> {
        return (await this.userService.findUserById(id));
    }


    async removeTokens(accessToken: string, refreshToken: string) {
        await this.userService.addTokenToBlacklist(accessToken);
        await this.userService.addTokenToBlacklist(refreshToken);
    }

    async isTokenInBlacklist(token: string): Promise<TokenBlacklist | undefined> {
        return (await this.userService.accessTokenInBlacklist(token));
    }

    async generateAuthTokens(payload : Object): Promise<object> {
        return ({
            access_token: await this.generateNewToken(payload, '1d'),
            refresh_token: await this.generateNewToken(payload, '2d'),
        });
    }
    
    async storeUserSecret(id :number, secret: string) {
        return (this.userService.storeUserSecret(id, secret));
    }

    async disableTwoFactors(id :number) {
        return (await this.userService.disableTwoFactors(id));
    }

    async verifyTwoFactors(payload: authTwoFactorVerifyDto) {
        const twoFactorSecret = await this.userService.getSecretById(payload.id);
        const simpleCrypto = new SimpleCrypto(twoFactorSecretCryptoKey);
        const decryptedData = simpleCrypto.decrypt(twoFactorSecret);
        const test = await otplib.authenticator.check(payload.passCode, decryptedData);
        return (test);
    }
}

