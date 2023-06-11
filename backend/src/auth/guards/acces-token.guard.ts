import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';


@Injectable()
export class TokenValidationGuard implements CanActivate { 
  constructor(private jwtService: JwtService, private authService: AuthService){}
  private payload: any;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('herer');
    console.log(request); 
    const token = request.cookies['tokens'].tokens.access_token;
    try {
        this.payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET,
      });
    }
    catch (err) {
      return (false); 
    }
    if ((this.authService.isTokenInBlacklist(token)) || !(this.authService.findUserById(this.payload.sub)))
      return (false);
    request['user'] = this.payload; 
    return (true);
  }
}