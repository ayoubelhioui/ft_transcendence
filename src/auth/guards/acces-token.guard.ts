import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';


@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    }
    catch (err) {
      return (false);
    }
    if (!(await this.authService.findUserById(payload.sub)))
      return (false);
    request['user'] = payload;
    return (true);
  }
}