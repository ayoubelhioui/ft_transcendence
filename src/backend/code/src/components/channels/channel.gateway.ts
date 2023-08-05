import { Injectable, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { ChannelExistsGuard, UserInChannelGuard, UserMutedGuard } from '../channels/guards';
import { IsSocket } from '../socket/decorators/is-socket.decorator';
import { ChannelService } from '../channels/channel.service';
import { SocketService } from '../socket/socket.service';
import { Channel, ChannelMessages, User } from 'src/database/entities';


@WebSocketGateway()
@UseFilters(WebSocketExceptionFilter)
@UsePipes(new ValidationPipe({
  transform : true,
  whitelist : true
}))
@Injectable()
export class ChannelGateway {

  constructor(
    private readonly socketService : SocketService
  ) {};
  @WebSocketServer()
  server: Server;

  private emitSystemPrompt(message : string, channelId : number) {
    const channelRoom = "channel_" + channelId;
    this.server.to(channelRoom).emit("on_message_send", {
      user : {
        username : 'system'
    },
      message : message,
      time : new Date(),
      channelId
    });
  }

  async joinUserToChannel(user : User, channel : Channel) {
    const userSockets : Socket[] = this.socketService.isUserOnline(user.id);
    const channelRoom = "channel_" + channel.id;
    this.emitSystemPrompt(`${user.username} joined the Channel ${channel.name}`, channel.id);
    userSockets.forEach(socket => {
        socket.join(channelRoom);
    })};


    systemMutingPrompts(user : User, channel : Channel, message : string) {
      // const channelRoom = "channel_" + channel.id;
      this.emitSystemPrompt(`${user.username} ${message}`, channel.id);
    };

    async leaveChannel(user : User, channel : Channel, message : string) {
        const userSockets : Socket[] = this.socketService.isUserOnline(user.id);
        const channelRoom = "channel_" + channel.id;
        this.emitSystemPrompt(`${user.username} ${message}`, channel.id);
        userSockets.forEach(socket => {
            socket.leave(channelRoom);
    })};

    async muteUser(user : User, channel : Channel) {
        // const channelRoom = "channel_" + channel.id;
        this.emitSystemPrompt(`${user.username} is  Muted`, channel.id);
    };


    public joinUserToNewChannel(user : User, channel : Channel) {
      if (!user)
        return ;
      const userSockets : Socket[] = this.socketService.isUserOnline(user.id);
      const channelRoom : string = 'channel_' + channel.id;
      userSockets.forEach( socket => {
        socket.join(channelRoom);
      });
    }
}
// export class ChatGateway{};
