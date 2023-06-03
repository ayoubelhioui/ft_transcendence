import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Head, Scope, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TokenAuthGuard } from "./guards/token-presence.guard";
import { UserDto } from "src/user/user.dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){};
    @Get('intra')
    @UseGuards(AuthGuard('42'))
    // @UseGuards(TokenAuthGuard)
    signIn(@Req() req) {
        console.log(req.user);
    }
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    singI(@Req() userDto: UserDto){
        return (this.authService.createUser(userDto));
    }
}