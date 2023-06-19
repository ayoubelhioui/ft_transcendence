import { Injectable, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { SocketService } from '../socket/socket.service';
import { User, Notification } from 'src/database/entities';


@WebSocketGateway()
@UsePipes(new ValidationPipe({
  transform : true,
  whitelist : true
}))
@UseFilters(WebSocketExceptionFilter)
@Injectable()
// @UseGuards(AuthSocketGuard)
export class NotificationGateway {

  constructor(
    private readonly socketService : SocketService
  ) {};
  @WebSocketServer()
  server: Server;


  async sendNotification(userToSend : User, notification : Notification) {
    const userSockets : Socket[] = this.socketService.isUserOnline(userToSend.id);
    userSockets.forEach(socket => {
        socket.emit("new_notification", {notification});
    });
  }
}

