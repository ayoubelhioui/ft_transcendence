import { Body, Controller, Get, Param, Post, Query, Req, Res, Headers, Head, Scope } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from 'express';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){};
    @Get('intra')
    signIn(@Headers() headers: Record<string, string>) {
        if (headers.authorization)
            console.log(headers.authorization);
        else
            console.log('theres no token, generate it');
        // res.setHeader('Location', 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a03da0e6296d63a6c503040864e2f87ed71295125a6d30ac9b58b101c977867e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code');
        // res.status(302).send();

    }
    @Get('callback')
    signI(@Query() req: string ) {
        // console.log({
        //     req
        // });
    }
}