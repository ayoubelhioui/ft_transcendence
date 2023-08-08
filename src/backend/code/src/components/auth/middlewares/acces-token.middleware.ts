
import { Injectable, CanActivate, ExecutionContext, NestMiddleware, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { NextFunction } from 'express';
import { customLog } from 'src/Const';


@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
    private payload: any;
    private token: string;
    private user: object;
    constructor(private jwtService: JwtService, private authService: AuthService){}

    private async _isValidToken() : Promise<boolean> {
        try {
            
            // customLog('token', this.token);
            this.payload = await this.jwtService.verifyAsync(this.token, {
            secret: process.env.TOKEN_SECRET, 
        });
        }
        catch (err) {
            return (false);
        }
        return (true);
    }

    async use(request: any, response: Response, next: NextFunction) {
        this.token = request.headers?.authorization?.replace('Bearer ', '');
        if (this.token == undefined)
            throw new UnauthorizedException('unauthorized');
        const isValidToken : boolean = await this._isValidToken();
        if (!isValidToken) {
            customLog('invalid token');
            throw new ForbiddenException('Invalid token');
        }

        this.user = await this.authService.findUserById(this.payload.sub);
        if (!(this.authService.isTokenInBlacklist(this.token)) || !this.user) {
            customLog('invalid token');
            throw new ForbiddenException('Invalid token');
        }
        request['user'] = this.user;
        next();
    }
}