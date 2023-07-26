import { Controller, Get, UseGuards, Request, Post, Body, Response, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { TokenValidationGuard } from "./guards/acces-token.guard";
import { UserDto } from "src/global/dto/user.dto";
import { access } from "fs";
import { CorsGuard } from "./guards/cors.guard";
import { client_address } from "src/Const";
import * as otplib from 'otplib';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    private user: UserDto;
    private a: string;
    @Post('logout')
    async logOut(@Body() body){
        await this.authService.removeTokens(body.refreshToken, body.accessToken);
    }

    @Get('refresh-token')
    // @UseGuards(TokenValidationGuard)
    async newAccessToken(@Request() req): Promise<object>{
        const payload = { sub: req.user.IntraId, username: req.user.username };
        return ({
            access_token: await this.authService.generateNewToken(payload, '10m'),
        });
    }

    @Get('user')
    // @UseGuards(TokenValidationGuard)
    singIn(@Request() req) : object{
        return ({
            user: req.user
        });
    }
    
    // @UseGuards(CorsGuard)

    @Post('two-factors-verify') //expecting the user id and the passcode.
    async verifyTwoFactors(@Body() body) : Promise<void> { 
        await this.authService.verifyTwoFactors(body);
        // await this.authService.authenticate(body, res);
    }

    @Post('two-factors-setup') //expecting the user id.
    setupTwoFactorAuth(@Body() body) : string {
        const secret: string = otplib.authenticator.generateSecret();
        this.authService.storeUserSecret(body.id, secret);
        const otpAuthUrl: string = otplib.authenticator.keyuri(body.username, 'transcendence', secret);
        return (otpAuthUrl);
    }

    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req, @Response() res) {
        this.user = await this.authService.isUserAlreadyExist(req.user);
        if (this.user.two_factors_enabled)
            res.redirect(`http://${client_address}?id=${req.user.IntraId}&username=${req.user.username}`); 
        else
            await this.authService.authenticate(this.user, res);
    }
}
