import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Head, Scope, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TokenPresenceGuard } from "./guards/token-presence.guard";
import { UserDto } from "src/dto/user.dto";
import { ConfigModule } from "@nestjs/config";
import { AccessTokenGuard } from "./guards/acces-token.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    @Get('refresh-token')
    @UseGuards(AccessTokenGuard)
    refreshToken(@Request() req) : Promise<object>{
        return (req.user.accessToken);
     }
    @Get('intra') 
    @UseGuards(AccessTokenGuard)
    singIn(@Request() req){ }
    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req){
        return (await this.authService.authenticateUser(req.user));
    }
}