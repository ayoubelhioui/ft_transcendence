import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
export declare class TokenValidationGuard implements CanActivate {
    private jwtService;
    private authService;
    constructor(jwtService: JwtService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
