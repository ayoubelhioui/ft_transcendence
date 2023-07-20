import { Injectable, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { SocketService } from '../socket/socket.service';
import { User } from 'src/database/entities';
import { Server } from 'socket.io';

@UseFilters(WebSocketExceptionFilter)
@UsePipes(new ValidationPipe({
  transform : true,
  whitelist : true
}))
@WebSocketGateway()
@Injectable()
export class FriendsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,

    ){}

  async new_friends_connect(user1 : User, user2: User) {

    const user1_sockets = this.socketService.getSocket(user1.id);
    const user2_sockets = this.socketService.getSocket(user2.id);
    this.server
      .to(user1_sockets
      .map(socket => socket.id))
      .emit("newFriendOnline", {user2});
    this.server
    .to(user2_sockets
    .map(socket => socket.id))
    .emit("newFriendOnline", {user1});
   
  }

  async old_friends_disconnect(user1 : User, user2: User) {

    const user1_sockets = this.socketService.getSocket(user1.id);
    const user2_sockets = this.socketService.getSocket(user2.id);
    this.server
      .to(user1_sockets
      .map(socket => socket.id))
      .emit("friendDisconnect", {user2});
    this.server
    .to(user2_sockets
    .map(socket => socket.id))
    .emit("friendDisconnect", {user1});
   
  }
}
