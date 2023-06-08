import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class TokenPresenceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return (request.headers.authorization);
  }
}