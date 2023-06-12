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
      this.token = request.headers.authorization.replace('Bearer ', '');
      // console.log(request.headers.authorization);
        this.payload = await this.jwtService.verifyAsync(this.token, {
          secret: process.env.TOKEN_SECRET, 
      });
    }
    catch (err) {
      return (false); 
    }
    // if ((this.authService.isTokenInBlacklist(this.token)) || !(this.authService.findUserById(this.payload.sub)))
    // {
    //   console.log('helloWorld');

    //   return (false);
    // }
    request['user'] = this.payload;
    console.log('im here');
    return (true);
  }
}