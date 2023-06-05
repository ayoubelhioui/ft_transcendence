import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Head, Scope, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TokenPresenceGuard } from "./guards/token-presence.guard";
import { UserDto } from "src/dto/user.dto";
import { ConfigModule } from "@nestjs/config";
import { TokenValidationGuard } from "./guards/token-validation.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req){
        const token = await this.authService.authenticateUser(req.user);
        
        return (token);
    }
}