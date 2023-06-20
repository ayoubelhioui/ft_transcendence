import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Game, User } from 'src/database/entities';
import { SocketService } from '../socket/socket.service';
import { GameService } from './game.service';
import { Injectable, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { AuthSocketGuard } from '../auth/guards/auth-socket.guard';
import { InviteToGameDto } from './dto/invite-to-game.dto';

@UseFilters(WebSocketExceptionFilter)
@UsePipes(new ValidationPipe({
  transform : true,
  whitelist : true
}))
@WebSocketGateway()
@Injectable()
export class GameGateway {
   
  constructor(
    private readonly socketService: SocketService,

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
  @SubscribeMessage ('invite_to_game')
  handleSendInviteEvent(client: Socket, payload: InviteToGameDto) {
    // Handle invite event logic
    console.log('Received invite event:', payload);
    const user : User =  this.socketService.getUser(client);
    const { gameId, targetedUserId} = payload;
    const socketsToSend : Socket[] = this.socketService.getSocket(+targetedUserId);
    const payloadToSend = {
      message: `You've been invited to a game by ${user.username}`,
      link : `games/${gameId}/join`,
      method: "Put"
    }
    socketsToSend.forEach(socketToSend => {
      socketToSend.emit('invitationToGame',payloadToSend );
    })
  }

  //refuse / close button to close popup

  // @SubscribeMessage ('accept')
  async gameAcceptInvite(game: Game) { 

    // const game = await this.gameService.joinGame(user,gameId);
    const player1Socket = this.socketService.getSocket(game.player1.id);
    const player2Socket = this.socketService.getSocket(game.player2.id);
    const payloadToSend = {
      gameId : game.token,
      message : "Game invite accepted"
    }
    player1Socket.forEach(socket => {
      socket.emit('invite_accepted',payloadToSend);
    });
  
    player2Socket.forEach(socket => {
      socket.emit('game_accepted',payloadToSend);
    });
    //redirect
  }

}
