import { Controller, Get, UseGuards, Request, Post, Body, Response, Redirect, Header } from "@nestjs/common";
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

    @Get('user')
    @UseGuards(TokenValidationGuard)
    singIn(@Request() req) : object{
        return ({ 
            user: req.user
        });
    }
    
    @Post('verify-two-factors')
    async verifyTwoFactors(@Body() body, @Response() res) {
        await this.authService.twoFactors(body.token, body.userEmail);
    }

    @Post('two-factors')
    async twoFactorsAuth(@Body() body) : Promise<string>{
        return (await this.authService.mailingUser(body.userEmail));
    }

    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req, @Response() res){
        let user = await this.authService.isUserAlreadyExist(req.user);
        if (user.two_factors_enabled)
            res.redirect('http://localhost:5000/two-factors');
        else
            await this.authService.authenticate(req.user, res);
    }
}