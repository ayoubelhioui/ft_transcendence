import { Controller, Get, UseGuards, Request, Post, Body, Response, Req, Res, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { TokenValidationGuard } from "./guards/acces-token.guard";
import { customLog, host_client_address } from "src/Const";
import * as otplib from 'otplib';
import { UserService } from "../user/user.service";
import { authTwoFactorVerifyStorDto } from "./dto/auth.two-factor-store";
import { authTwoFactorVerifyDto } from "./dto/auth.two-factor-verify.dto";


@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService, private userService: UserService){}


    @Post('logout')
    async logOut(@Body() body){
        await this.authService.removeTokens(body.refreshToken, body.accessToken);
    }

    @Get('refresh-token')
    @UseGuards(TokenValidationGuard)
    async newAccessToken(@Request() req): Promise<object>{
        const payload = { sub: req.user.id, username: req.user.username };
        return ({
            access_token: await this.authService.generateNewToken(payload, '10m'),
        });
    }

    @Get('user')
    singIn(@Request() req) : object{
        return ({
            user: req.user
        });
    }

    @Get('generate-secret-two-factor')
    async generateSecret() {
        const secret: string = otplib.authenticator.generateSecret();
        return (secret);
    }

    @Post('two-factors-verify-store')
    async verifyTwoFactorsAndStore(@Body() body: authTwoFactorVerifyStorDto, @Res() res, @Req() req) : Promise<void> {
        //console.log('the fucking secret is :  ' + body.secretCode, " AND code is : ", body.passCode);
        const isMatched = otplib.authenticator.check(body.passCode, body.secretCode);
        if (isMatched)
        {
            await this.authService.storeUserSecret(req.user.id, body.secretCode);
            res.status(200).json({ message: 'Passcode is valid.' });
        }
        else
            res.status(HttpStatus.UNAUTHORIZED).json({ error: 'InvalidPasscode', message: 'The passcode provided is incorrect. Please try again.' });
    }
    

    @Post('two-factors-verify')
    async verifyTwoFactors(@Body() body : authTwoFactorVerifyDto , @Res() res, @Req() req) : Promise<void> {
        const isMatched = await this.authService.verifyTwoFactors(body);
        const user = await this.userService.findUserById(body.id)
        if (isMatched)
            await this.authService.authenticate(user, res, false);
        else
            res.status(HttpStatus.UNAUTHORIZED).json({ error: 'InvalidPasscode', message: 'The passcode provided is incorrect. Please try again.' });
    }

    @Post('disable-two-factors')
    async disableTwoFactors(@Req() req) : Promise<void> {
        await this.authService.disableTwoFactors(req.user.id)
    }

    @UseGuards(AuthGuard('42'))
    @Get('callback')
    async singUp(@Request() req, @Response() res) {
        const user = await this.authService.signUpByIntra(req.user);
        if (user.two_factors_enabled)
            res.redirect(`http://${host_client_address}?id=${user.id}`);
        else
            await this.authService.authenticate(user, res, true);
    }



    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {}
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req, @Response() res) {
        customLog(req.user);
        const user = await this.authService.signUpByGoogle(req.user);
        if (user.two_factors_enabled)
            res.redirect(`http://${host_client_address}?id=${user.id}`);
        else
            await this.authService.authenticate(user, res, true);
    }
}
