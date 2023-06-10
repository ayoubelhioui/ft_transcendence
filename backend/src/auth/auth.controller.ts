import { Controller, Get, UseGuards, Request, Post, Body, Response, Redirect } from "@nestjs/common";
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
    singIn(@Request() req){
        return ({
            user: req.user
        });
    }

    // @Post('add')

    
    @UseGuards(AuthGuard('42'))
    @Get('callback')
    // @Redirect('http://localhost:5000/settings', 301)
    async singUp(@Request() req, @Response() res){
        
        // res
        // let data = await this.authService.authenticateUser(req.user);
        // res.send(data);
        // return (data);
        // res.cookie('testCookie', data, { httpOnly: true });
        // res.send('Cookie set!');
        // return ('helloWorld');
    }
}