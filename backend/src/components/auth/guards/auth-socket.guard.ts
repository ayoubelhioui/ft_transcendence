import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // 

@Injectable()
export class AuthSocketGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
    ) {};

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs().getData();
    // Retrieve the authentication token from the request
    const authToken = request?.handshake?.headers?.authorization; 
    if (!authToken)
        return (false);
    const token = authToken.replace('Bearer ', '');
    try {
      var payload = await this.jwtService.verify(token, {
        secret: "khalid",
      });
    } catch (err) {
      throw new UnauthorizedException("you are not authorized !")
    }
    request.user = payload;
    return (true);
  }
}