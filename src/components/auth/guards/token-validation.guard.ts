import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenValidationGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    console.log( "khalid");
    try {
      console.log(token);
      var payload = await this.jwtService.verify(token, {
        secret: "khalid",
      });
    } catch (err) {
      console.log(err);
    }
    request['user'] = payload;
    return (true);
  }
}