import { Injectable, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { ChannelExistsGuard, UserInChannelGuard, UserMutedGuard } from '../channels/guards';
import { IsSocket } from '../socket/decorators/is-socket.decorator';
import { sendMessageDto } from './dto/send-message.dto';
import { ChannelService } from '../channels/channel.service';
import { SocketService } from '../socket/socket.service';
import { Channel, ChannelMessages, User } from 'src/database/entities';
import { customLog } from 'src/Const';
import { FriendsService } from '../friends/friends.service';
import { UserService } from '../user/user.service';


@WebSocketGateway()
@UseFilters(WebSocketExceptionFilter)
@UsePipes(new ValidationPipe({
  transform : true,
  whitelist : true
}))
@Injectable()
export class ChatGateway {

  constructor(
    private readonly socketService : SocketService,
    private readonly channelService : ChannelService,
    private readonly friendsService : FriendsService,
    private readonly userService : UserService


  ) {};
  @WebSocketServer()
  server: Server;

  @SubscribeMessage ('send_message')
  @IsSocket(true)
  @UseGuards(ChannelExistsGuard, UserInChannelGuard, UserMutedGuard)
  async sendMessage(socket: Socket,  sendMessageDto : sendMessageDto)
  {
    console.log("hereeeeeeee");
    let user: User  =  this.socketService.getUser(socket);
    const channel : Channel = this.socketService.getChannel(socket);
 
    const createdMessage : ChannelMessages = await this.channelService.createMessage(user, channel, sendMessageDto.message);
    const channelRoom = "channel_" + channel.id;
    user = await this.userService.findUserById(user.id)
    const blockedByUsers : User [] = await this.friendsService.is_blocked_by_arr(user)//blockd

    const blockedByUsersIds : number[] = blockedByUsers.map((element) => element.id)

   for (let i = 0; i < blockedByUsers.length; i++) {
      const socketClient : Socket[] = this.socketService.isUserOnline(blockedByUsersIds[i]);
      for (let j = 0; j < socketClient.length; j++) {
        socketClient[j].leave(channelRoom);
      }
   }
    this.server.to(channelRoom).emit("on_message_send", {
      user, 
      message : createdMessage.message, 
      time : createdMessage.time,
      channelId : channel.id,
    });

    for (let i = 0; i < blockedByUsers.length; i++) {
        const socketClient : Socket[] = this.socketService.isUserOnline(blockedByUsersIds[i]);
        for (let j = 0; j < socketClient.length; j++) {
          socketClient[j].join(channelRoom);
      }
    }
  }


  // /*if useer muted, sends a message > dont emit to others, emit a message to that user in that channel "You are muted" on each msg sent

  //   before sending message fetch if muted,
  //   if muted, cache expiration date, only fetch again after that
  // */
  // handleDisconnect(socket: Socket) {
  //   customLog('Client disconnected');
  // }
}
// export class ChatGateway{};
