import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class TokenValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return (true);
  }
}