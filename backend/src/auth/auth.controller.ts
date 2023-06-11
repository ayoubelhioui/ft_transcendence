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
    singIn(@Request() req){
        return ({ 
            user: req.user
        });
    }

    // @Get('intra')
    // async test(@Request() req, @Response() res){
    //     res.redirect("https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a03da0e6296d63a6c503040864e2f87ed71295125a6d30ac9b58b101c977867e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code");
    // }
    
    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req, @Response() res){
        let data = await this.authService.authenticateUser(req.user);
        res.cookie('tokens', data); 
        res.redirect("http://localhost:5000/Home");  
    }
}