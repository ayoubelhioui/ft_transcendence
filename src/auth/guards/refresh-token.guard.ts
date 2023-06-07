import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';


@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.headers.authorization.replace('Bearer ', '');
    console.log(request.headers);
    let payload;
    try {
        payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    }
    catch (err) {
      return (false);
    }
    request.user.accessToken = this.authService.generateNewToken('10m'); 
    // if (!(await this.authService.findUserById(payload.sub)))
    //   return (false);
    return (true);
  }
}