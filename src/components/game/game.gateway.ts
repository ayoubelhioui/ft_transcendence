import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/database/entities';
import { SocketService } from '../socket/socket.service';
import { GameService } from './game.service';
import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { AuthSocketGuard } from '../auth/guards/auth-socket.guard';

@UseFilters(WebSocketExceptionFilter)
// @UseGuards(AuthSocketGuard)
@WebSocketGateway()
@Injectable()
export class GameGateway {
   
  constructor(
    private readonly socketService: SocketService,
    private readonly gameService: GameService

    ){}
  
  @WebSocketServer()
  server: Server;


  // handleConnection(socket: Socket) {
  //   // Handle connection logic
  //   console.log('New client connected:', socket.id);
  // }

  // handleDisconnect(socket: Socket) {
  //   // Handle disconnection logic
  //   console.log('Client disconnected:', socket.id);
  // }


  
  //make GenerateInviteLink + Invite user (getFriends)
  @SubscribeMessage ('invite')
  handleSendInviteEvent(client: Socket, payload: any) {
    // Handle invite event logic
    console.log('Received invite event:', payload);
    const user : User =  this.socketService.getUser(client);
    const { gameId, targetedUserId} = payload;
    const socketsToSend : Socket[] = this.socketService.getSocket(+targetedUserId);
    const payloadToSend = {
      message: `You've been invited to a game by ${user.username}`,
      gameId 
    }
    socketsToSend.forEach(socketToSend => {
      socketToSend.emit('invitationToGame',payloadToSend );
    })
  }

  //refuse / close button to close popup
  @SubscribeMessage ('refuse')
  handleRefuseEvent(client: Socket, payload: any) {


  }

  @SubscribeMessage ('accept')
  async handleAcceptEvent(client: Socket, payload: any) {

    const { gameId } = payload;

    const user = this.socketService.getUser(client);
    const game = await this.gameService.joinGame(user,gameId);
    const player1Socket = this.socketService.getSocket(game.player1.id);
                          //getGameSocket
    const payloadToSend = {
      gameId,
      message : "Game invite accepted"
    }
    player1Socket.forEach(socket => {
      socket.emit('invite_accepted',payloadToSend);
    });
    player1Socket.forEach(socket => socket.emit('invite_accepted',payloadToSend));
    client.emit('game_accepted',payloadToSend );
    //redirect
  }

}
