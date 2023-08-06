import { ForbiddenException, Injectable, NotFoundException, Redirect } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { host_client_address } from "src/Const";
import { UserDto } from "src/global/dto/user.dto";
import TokenBlacklist from "src/database/entities/token_blacklist";
import { UserService } from "src/components/user/user.service";
import * as otplib from 'otplib';
import { PasswordService } from "../channels/password.service";
import { authTwoFactorVerifyDto } from "./dto/auth.two-factor-verify.dto";
const SimpleCrypto = require("simple-crypto-js").default;


@Injectable()
export class AuthService{
    private payload: object;
    private userInfo: any;
    constructor(private jwtService: JwtService, private userService: UserService, private passwordService: PasswordService) { }
    
    async isUserAlreadyExist(userDto: UserDto){
        this.userInfo = await this.findUserById(userDto.IntraId);
        if (!this.userInfo)
        {
            this.userInfo = await this.userService.createUser(userDto);
            await this.userService.uploadImageFromUrl(userDto.avatar, './uploads/' + userDto.IntraId);
        }
        return (this.userInfo);
    }

    async authenticate(userDto: authTwoFactorVerifyDto, res: any, redirect : boolean) : Promise<void> {
        this.payload = { sub: userDto.IntraId, username: userDto.username };

        const tokens = await this.generateAuthTokens();
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

    async findUserById(intraId: number) : Promise<object | undefined> {
        return (await this.userService.findById(intraId));
    }

    async removeTokens(accessToken: string, refreshToken: string) {
        await this.userService.addTokenToBlacklist(accessToken);
        await this.userService.addTokenToBlacklist(refreshToken);
    }

    async isTokenInBlacklist(token: string): Promise<TokenBlacklist | undefined> {
        return (await this.userService.accessTokenInBlacklist(token));
    }

    async mailingUser(userEmail: string) {
        this.payload = { sub: userEmail };
        const emailVerificationCode: string = await this.generateNewToken(this.payload, '3m');
        await this.userService.sendEmail(emailVerificationCode, userEmail);
    }

    async generateAuthTokens(): Promise<object> {
        return ({
            access_token: await this.generateNewToken(this.payload, '1d'),
            refresh_token: await this.generateNewToken(this.payload, '2d'),
        });
    }
    
    async storeUserSecret(id :number, secret: string) {
        return (this.userService.storeUserSecret(id, secret));
    }

    async disableTwoFactors(id :number) {
        return (await this.userService.disableTwoFactors(id));
    }

    async verifyTwoFactors(Body: authTwoFactorVerifyDto) {
        const twoFactorSecret = await this.userService.getSecretById(Body.id);
        const simpleCrypto = new SimpleCrypto('helloWorldTesting');
        const decryptedData = simpleCrypto.decrypt(twoFactorSecret);
        const test = await otplib.authenticator.check(Body.passCode, decryptedData);
        return (test);
    }
}

