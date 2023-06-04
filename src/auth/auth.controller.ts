import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Head, Scope, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TokenPresenceGuard } from "./guards/token-presence.guard";
import { UserDto } from "src/user/user.dto";
import { ConfigModule } from "@nestjs/config";
import { TokenValidationGuard } from "./guards/token-validation.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    @Get('intra')
    @UseGuards(TokenPresenceGuard, TokenValidationGuard)
    signIn(@Req() req) { }
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    async singI(@Req() userDto: UserDto, @Res({passthrough: true}) res: Response){
        console.log('im here');
        const token = this.authService.createUser(userDto);
        console.log(token);
        // res.cookie('access_token', token, {
        //     httpOnly: true,
        //     expires: new Date(Date.now() + 1 * 60 * 1000),
        // }).send().status(200);
        return (token);
    }
}