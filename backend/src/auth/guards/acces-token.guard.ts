import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';


@Injectable()
export class TokenValidationGuard implements CanActivate { 
  constructor(private jwtService: JwtService, private authService: AuthService){}
  private payload: any;
  private token: string;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      console.log(request.headers.authorization);
        this.token = request.headers.authorization.replace('Bearer ', '');
        this.payload = await this.jwtService.verifyAsync(this.token, {
        secret: process.env.TOKEN_SECRET, 
      });
    }
    catch (err) {
      // console.log(err);
      return (false); 
    }
    if ((this.authService.isTokenInBlacklist(this.token)) || !(this.authService.findUserById(this.payload.sub)))
      return (false);
    request['user'] = this.payload; 
    return (true);
  }
}