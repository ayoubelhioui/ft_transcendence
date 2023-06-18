import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { AuthSocketGuard } from '../auth/guards/auth-socket.guard';
import { ChannelExistsGuard, UserInChannelGuard, UserMutedGuard } from '../channels/guards';
import { IsSocket } from '../socket/decorators/is-socket.decorator';
import { ChannelService } from '../channels/channel.service';
import { SocketService } from '../socket/socket.service';
import { Channel, ChannelMessages, User, Notification } from 'src/database/entities';


@WebSocketGateway()
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

