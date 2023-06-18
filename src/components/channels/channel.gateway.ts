import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { AuthSocketGuard } from '../auth/guards/auth-socket.guard';
import { ChannelExistsGuard, UserInChannelGuard, UserMutedGuard } from '../channels/guards';
import { IsSocket } from '../socket/decorators/is-socket.decorator';
import { ChannelService } from '../channels/channel.service';
import { SocketService } from '../socket/socket.service';
import { Channel, ChannelMessages, User } from 'src/database/entities';


@WebSocketGateway()
@UseFilters(WebSocketExceptionFilter)
@Injectable()
// @UseGuards(AuthSocketGuard)
export class ChannelGateway {

  constructor(
    private readonly socketService : SocketService
  ) {};
  @WebSocketServer()
  server: Server;

  private emitSystemPrompt(message : string, channelRoom : string) {
    this.server.to(channelRoom).emit("on_message_send", {
        user : {
            username : 'system'
        }, 
        message : message, 
        time : new Date()
    });
  }

  async joinUserToChannel(user : User, channel : Channel) {
    const userSockets : Socket[] = this.socketService.isUserOnline(user.id);
    const channelRoom = "channel_" + channel.id;
    userSockets.forEach(socket => {
        this.emitSystemPrompt(`${user.username} joined the Channel`, channelRoom);
        socket.join(channelRoom);
    })};



    async leaveChannel(user : User, channel : Channel) {
        const userSockets : Socket[] = this.socketService.isUserOnline(user.id);
        const channelRoom = "channel_" + channel.id;
        userSockets.forEach(socket => {
            this.emitSystemPrompt(`${user.username} left the Channel`, channelRoom);
            socket.leave(channelRoom);
    })};

    async muteUser(user : User, channel : Channel) {
        const channelRoom = "channel_" + channel.id;
        this.emitSystemPrompt(`${user.username} is  Muted`, channelRoom);
    };
}
// export class ChatGateway{};
