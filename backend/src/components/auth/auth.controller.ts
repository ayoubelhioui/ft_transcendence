import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Head, Scope, UseGuards, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TokenPresenceGuard } from "./guards/token-presence.guard";
import { CreateUserDto } from "src/components/user/dto/user.dto";
import { ConfigModule } from "@nestjs/config";
import { TokenValidationGuard } from "./guards/token-validation.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    // @Get('intra')
    // @UseGuards(TokenPresenceGuard, TokenValidationGuard)
    // signIn(@Req() req) { }
    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singI(@Req() userDto: CreateUserDto)
    {
        userDto.id = 10;
        const token = this.authService.createUser(userDto);
        return (token);
    }

    @Post(':id')
    async getAccesToken(@Param("id", ParseIntPipe) id : number) {
        return (this.authService.getAccesToken(id));
    }
}