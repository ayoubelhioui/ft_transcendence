import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WsException } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io';
import { User } from 'src/database/entities';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketExceptionFilter } from './websocket-exception.filter';
import { AuthSocketGuard } from '../auth/guards/auth-socket.guard';
import { UserService } from '../user/user.service';
import { plainToClass } from 'class-transformer';

@WebSocketGateway()

@UseFilters(WebSocketExceptionFilter)
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(
    private readonly socketService: SocketService,
    private readonly jwtService : JwtService,
    private readonly userService : UserService
    ) {}


  private async isAuth(socket : Socket) : Promise <boolean>
  {
    // Retrieve the authentication token from the request
    const authToken = socket.handshake?.headers?.authorization; 
    if (!authToken)
        return (false);
    const token = authToken.replace('Bearer ', '');
    try {
      var payload = await this.jwtService.verify(token, {
        secret: "khalid",
      });
    } catch (err) {
      return (false);
    }

    const {sub, iat, exp, ...user } = payload as any;
    (socket as any).user  = user;
    return (true);
  }

  async handleConnection(client: Socket) {

    const isAuth : boolean = await this.isAuth(client);
    if (!isAuth)
    {
      client.emit("exception",{message : "you are not Authorize"})
      console.log("khroj tqawd");
      client.disconnect();
      return;
    }
    console.log("connected")
    const user : User = this.socketService.getUser(client);
    this.socketService.addSocket(user.id, client);
      
    // Perform any shared connection logic or notify modules about the connection
  }

  async handleDisconnect(client: Socket)
  {
    console.log("disconnected")
    const user : User = this.socketService.getUser(client);
    if (user)
      this.socketService.removeSocket(user.id, client);
  }
}
