
import { Injectable, CanActivate, ExecutionContext, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { NextFunction } from 'express';


@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
    private payload: any;
    private token: string;
    private user: object;
    constructor(private jwtService: JwtService, private authService: AuthService){}

    private async _isValidToken() : Promise<boolean> {
        try {
            
            console.log('token', this.token);
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
        const isValidToken : boolean = await this._isValidToken();
   
        if (!isValidToken) {
            console.log('invalid token');
            throw new ForbiddenException('Invalid token');
        }

        this.user = await this.authService.findUserById(this.payload.sub);
        if (!(this.authService.isTokenInBlacklist(this.token)) || !this.user) {
            console.log('invalid token');
            throw new ForbiddenException('Invalid token');
        }
        request['user'] = this.user;
        next();
    }
}