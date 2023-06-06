import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenValidationGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET,
      });
      await this.authService.findUserById(payload.sub);
    } catch (err) {
      return (false);
    }
    request['user'] = payload;
    return (true);
  }
}