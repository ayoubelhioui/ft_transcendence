import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WsException, WebSocketServer } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket , Server} from 'socket.io';
import { Channel, User } from 'src/database/entities';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketExceptionFilter } from './websocket-exception.filter';
import { ChannelService } from '../channels/channel.service';
import { FriendsService } from '../friends/friends.service';
import { GameService } from '../game/game.service';

@WebSocketGateway()
@UseFilters(WebSocketExceptionFilter)
@Injectable()

export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly jwtService : JwtService,
    private readonly channelService : ChannelService,
    private readonly friendsService : FriendsService,
    private readonly gameService : GameService

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

  private async getOnlineFriendsSocket(user : User) :  Promise <Socket[]>{
    const onlineFriendsSockets : Socket[] = [];
    const friends : User[] = await this.friendsService.getFriends(user);
    friends.forEach(friend => {
      const friendsSocket : Socket[] = this.socketService.isUserOnline(friend.id);
      if (friendsSocket.length)
        onlineFriendsSockets.push(...friendsSocket);
    });
    return (onlineFriendsSockets);
  }


  private async handleOnlineStatus(client: Socket) {
    const user : User = this.socketService.getUser(client);
    const onlineFriendsSockets : Socket[] = await this.getOnlineFriendsSocket(user);

    this.server
      .to(onlineFriendsSockets
      .map(socket => socket.id))
      .emit("newFriendOnline", {user});
    client.emit("myOnlineFriends",
    onlineFriendsSockets.map(socket => this.socketService.getUser(socket)))
  }

  private async joinUserChannels(client: Socket) {
    const user : User = this.socketService.getUser(client);
    const channelsId : Channel[] = await this.channelService.getUserChannelsId(user);
    // console.log(channelsId);
    channelsId.forEach( element => {
      const channelRoom : string = 'channel_' + element.id;
      client.join(channelRoom);
    });
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
    await Promise.all([
      this.handleOnlineStatus(client),
      this.joinUserChannels(client)
    ]);
    // Perform any shared connection logic or notify modules about the connection
  }

  async closeJoinedGames(user : User)
  {
    const existingGames : any = await this.gameService.getJoinedGames(user);
    existingGames.forEach(async game => {
      if(game.player2)
      {
          await this.gameService.setGameResult(user.id, game.token ,0,5);
          const secondPlayer = user.id === game.playey1.id? game.player1 : game.player2;
          const secondPlayerSockets  = this.socketService.isUserOnline(secondPlayer);
          secondPlayerSockets.forEach(socket => {
            socket.emit("game_finished");
          })
      }
      else
        this.gameService.deleteGame(game);
  });
  }

  async handleDisconnect(client: Socket)
  {
    console.log("disconnected")
    const user : User = this.socketService.getUser(client);
    if (user)
    {
      this.socketService.removeSocket(user.id, client);
      const userSockets : Socket[] = this.socketService.isUserOnline(user.id);
      if (!userSockets.length) {
        await this.closeJoinedGames(user);
        const onlineFriendsSockets : Socket[] = await this.getOnlineFriendsSocket(user);
        this.server
        .to(onlineFriendsSockets.map(socket => socket.id))
        .emit("friendDisconnect", {user});
      }
    }
  }
}
