import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';


@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.headers.authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.TOKEN_SECRET,
      });
    }
    catch (err) {
      return (false);
    }
    return (true);
  }
}