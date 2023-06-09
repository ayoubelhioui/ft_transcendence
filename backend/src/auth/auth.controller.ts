import { Controller, Get, UseGuards, Request, Post, Body, Response } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { TokenValidationGuard } from "./guards/acces-token.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('logout')
    async logOut(@Body() body){ 
        await this.authService.removeTokens(body.refreshToken, body.accessToken); 
    }

    @Get('refresh-token')
    @UseGuards(TokenValidationGuard)
    async newAccessToken(@Request() req): Promise<object>{
        return ({
            access_token: await this.authService.generateNewToken('10m'),
        });
    }

    @Get('intra')
    @UseGuards(TokenValidationGuard)
    singIn(@Request() req){
        console.log('helloWorld');
        return ({
            user: req.user
        });
    }

    @UseGuards(AuthGuard('42'))
    @Get('callback') 
    async singUp(@Request() req, @Response() res){
        let data = await this.authService.authenticateUser(req.user);
        res.cookie('testCookie', data, { httpOnly: true });
        res.send('Cookie set!'); 
        return (data);
    }
}