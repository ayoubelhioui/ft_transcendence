import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenValidationGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    console.log( process.env.TOKEN_SECRET);
    try {
      console.log(token);
      const payload = await this.jwtService.verify(token, {
        secret: process.env.TOKEN_SECRET,
      });
    } catch (err) {
      console.log(err);
    }
    // request['user'] = payload;
    return (true);
  }
}