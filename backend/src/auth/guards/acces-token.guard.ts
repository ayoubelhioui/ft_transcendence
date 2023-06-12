import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';


@Injectable()
export class TokenValidationGuard implements CanActivate { 
  constructor(private jwtService: JwtService, private authService: AuthService){}
  private payload: any;
  private token: string;
  private user: object;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      this.token = request.headers.authorization.replace('Bearer ', '');
        this.payload = await this.jwtService.verifyAsync(this.token, {
          secret: process.env.TOKEN_SECRET, 
      });
    }
    catch (err) {
      return (false); 
    }
    this.user = await this.authService.findUserById(this.payload.sub);
    if (!(this.authService.isTokenInBlacklist(this.token)) || !this.user)
      return (false);
    console.log(this.user);
    request['user'] = this.user;
    return (true);
  }
}