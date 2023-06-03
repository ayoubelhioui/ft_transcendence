import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class TokenAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
