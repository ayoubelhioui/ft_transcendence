import { Controller, Get, UseGuards, Request, Post, Body, Response, Redirect, Header } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { TokenValidationGuard } from "./guards/acces-token.guard";
import { UserDto } from "src/dto/user.dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    private user: UserDto;

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
        await this.authService.authenticate(this.user, res);
    }

    @Post('two-factors')
    async twoFactorsAuth(@Body() body) : Promise<void> {
        await this.authService.mailingUser(body.userEmail);
    }

    @UseGuards(AuthGuard('42'))
    @Get('callback') // i need to change the image, take the small image from the profile (from intra api).
    async singUp(@Request() req, @Response() res){
        this.user = req.user;
        let user = await this.authService.isUserAlreadyExist(this.user);
        if (user.two_factors_enabled)
            res.redirect('http://localhost:5000/two-factors-authentication');
        else
               await this.authService.authenticate(this.user, res);
    }
}