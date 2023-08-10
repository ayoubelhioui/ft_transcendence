import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Game, User } from 'src/database/entities';
import { SocketService } from '../socket/socket.service';
import { GameService } from './game.service';
import { Injectable, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { InviteToGameDto } from './dto/invite-to-game.dto';
import { GameSessions } from './game-sessions.service';
import { PlayerJoinDto } from './dto/play-join.dto';
import { RacketMoveDto } from './dto/racket-move.dto';
import { HitBallDto } from './dto/hit-ball.dto';
import { MovePaddleDto } from './dto/move-paddle.dto';
import { UserRepository } from '../repositories';
import { UserService } from '../user/user.service';
import { customLog } from 'src/Const';
import * as clc from 'cli-color';
import { AClient } from './class/AClinet';

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
    private readonly gameSession : GameSessions,
    private readonly userService : UserService

    
    ){} 
  
  @WebSocketServer()
  server: Server;


  // handleConnection(socket: Socket) {
  //   // Handle connection logic
  //   customLog('New client connected:', socket.id);
  // }

  // handleDisconnect(socket: Socket) {
  //   // Handle disconnection logic
  //   customLog('Client disconnected:', socket.id);
  // }


  


  //make GenerateInviteLink + Invite user (getFriends)
  @SubscribeMessage ('invite_to_game')
  handleSendInviteEvent(client: Socket, payload: InviteToGameDto) {
    // Handle invite event logic
    customLog('Received invite event:', payload);
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

  @SubscribeMessage ('join_game')
  async joinGame(client: Socket, payload: PlayerJoinDto) {
    const user = this.socketService.getUser(client);
    const id = user.id;
    payload.user = await this.userService.findUserById(id)
    payload.socketService = this.socketService 
    try {
      await this.gameSession.addClient(payload, client)
    } catch (e : any) {
      customLog("addClient Error:", e.message)
      client.emit("exception", e.message)
      console.log("exception", e.message)
    }
  }

  @SubscribeMessage ('leaveGame')
  async leaveGame(client: Socket, payload: any) {
    const user = this.socketService.getUser(client);
    customLog(clc.red("leaveGame:", user.username))
    await this.gameSession.removeClient(client)
  }

  @SubscribeMessage ('moveRacket')
  racketMove(client: Socket, payload: RacketMoveDto) {
    this.gameSession.racketMove(payload, client.id)
  }

  @SubscribeMessage ('hitBall')
  hitBall(client: Socket, payload: HitBallDto) {
    this.gameSession.hitBall(payload, client.id)
  }

  @SubscribeMessage ('movePaddle')
  paddleMove(client: Socket, payload: MovePaddleDto) {
    this.gameSession.paddleMove(payload, client.id)
  }

}
