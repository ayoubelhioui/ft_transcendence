import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { TokenValidationGuard } from "./guards/acces-token.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Get('logout')
    logOut(){

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
        return ({
            statusCode: 200,
            // user: {

            // }
        })
    }

    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req): Promise<object>{
        return (
            await this.authService.authenticateUser(req.user)
        );
    }
}