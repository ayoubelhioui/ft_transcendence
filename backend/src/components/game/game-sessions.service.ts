

import { Injectable, NotFoundException, UnauthorizedException, UseFilters } from '@nestjs/common';
import { GameService } from './game.service';
import { Server, Socket} from 'socket.io';
import { ClassicRoom } from './game-components/Room/ClassicRoom';
import { ThreeRoom } from './game-components/Room/ThreeRoom';
import * as clc from 'cli-color';
import { UserService } from '../user/user.service';
import { Room } from './game-components/Room/Room';
import { Game, User } from 'src/database/entities';
import { PlayerJoin } from './interfaces/play-join.interface';
import { RacketMoveI } from './interfaces/racket-move.interface';
import { HitBallI } from './interfaces/hit-ball.interface';
import { MovePaddleI } from './interfaces/move-paddle.interface';
import { FriendsService } from '../friends/friends.service';
import { customLog } from 'src/Const';
import { Queue } from './class/Queue';
import { AClient } from './class/AClinet';
import { Match } from './class/Match';
import { SocketService } from '../socket/socket.service';


enum AchievementEnum {
    LOSS_AGAINST_BOSS,
    WIN_AGAINST_BOSS,
    FIRST_GAME,
    WIN_WITH_OPPONENT_ZERO_SCORE
}

@Injectable()
export class GameSessions {

    private classicQueue : Queue
    private threeQueue : Queue
    private clientRooms : Map<string, ClassicRoom | ThreeRoom> 

    constructor(
        private readonly gameService: GameService | undefined,
        private readonly userService: UserService | undefined,
        private readonly friendsService : FriendsService,
        ) {
        this.classicQueue = new Queue()
        this.threeQueue = new Queue()
        this.clientRooms = new Map()
    }


    private async setAchievement(room : Room) {
        await this.userService.setAchievement(AchievementEnum.FIRST_GAME, room.player1.id)
        if (room.player2.id === 2147483647 && room.getScore().player1Score > room.getScore().player2Score) {
            await this.userService.setAchievement(AchievementEnum.WIN_AGAINST_BOSS, room.player1.id)
            
            this.userService.setAchievement(AchievementEnum.WIN_WITH_OPPONENT_ZERO_SCORE, room.player1.id)
        }
        if (room.player2.id === 2147483647 && room.getScore().player1Score > room.getScore().player2Score) {
            await this.userService.setAchievement(AchievementEnum.LOSS_AGAINST_BOSS, room.player1.id)
        }
        if (room.getScore().player1Score === 0 && room.getScore().player2Score > 0) {
            await this.userService.setAchievement(AchievementEnum.WIN_WITH_OPPONENT_ZERO_SCORE, room.player2.id)
        }
        if (room.getScore().player2Score === 0 && room.getScore().player1Score > 0) {
            await this.userService.setAchievement(AchievementEnum.WIN_WITH_OPPONENT_ZERO_SCORE, room.player1.id)
        }
    }

    private async setGameResult(room : Room, leftClient : Socket | undefined) {
        const roomId = room.roomId
        const gameScore = room.getScore()

        await this.setAchievement(room)
        if (!leftClient) {
            await this.gameService.setGameResult(room.player1.id, roomId ,gameScore.player1Score, gameScore.player2Score);
        } else {
            if (room.isBotGame) {
                await this.gameService.setGameResult(room.player1.id, roomId ,0, 5);
            } else if (room.player1.socket.id === leftClient.id) {
                await this.gameService.setGameResult(room.player1.id, roomId ,0, 5);
            } else {
                await this.gameService.setGameResult(room.player1.id, roomId ,5, 0);
            }
        }
    }
    


    //####################################################################
    //####################################################################
    //########### Add
    //####################################################################
    //####################################################################

    inviteToGame(socketService : SocketService, newClient : AClient)
    {
      const targetedUserId = newClient.userToInvite
      const socketsToSend : Socket[] = socketService.getSocket(targetedUserId);
      const payloadToSend = {
        username : newClient.user.username,
        id : newClient.user.id,
        intraId : newClient.user.IntraId,
        gameToken: newClient.gameToken,
        gameType : newClient.isClassicGame ? "classic" : "3d game",
        isClassic : newClient.isClassicGame,
        isBotMode : false

      }
      console.log(payloadToSend)
      socketsToSend.forEach(socketToSend => {
        socketToSend.emit('invite_to_game', payloadToSend);
      })
    }

    async addClient(payload : PlayerJoin, socket : Socket) {
        customLog(clc.bgBlue("add client"))
        const newClient = new AClient(payload, socket)
        let match : Match | undefined = undefined
        if (payload.isClassic) {
            match = this.classicQueue.addAndGetMatch(newClient)
        } else {
            match = this.threeQueue.addAndGetMatch(newClient)
        }
        if (match) {
            await this.exec(match, payload.isClassic)
        }
        if (!match && payload.userToInvite) {
            this.inviteToGame(payload.socketService, newClient)
        }
        customLog(clc.bgGreen("classicQueue"))
        this.classicQueue.print()
        customLog(clc.bgGreen("threeQueue"))
        this.threeQueue.print()
    }

    private async createGame(match : Match, isClassic : boolean) {
        const player1 = match.player1.user
        const player2 = match.player2.user
        const newGame = await this.gameService.createGame(player1, player2, isClassic)
        customLog(newGame.message)
        if (newGame.exists === 1)
            return (undefined)
        return (newGame.game)
    }

    private async exec(match : Match, isClassic : boolean) {
        const newGame = await this.createGame(match, isClassic)
        if (newGame) {
            let newRoom = isClassic 
            ? new ClassicRoom(newGame.token, match.player1, match.player2, match.isBotGame)
            : new ThreeRoom(newGame.token, match.player1, match.player2, match.isBotGame);
            customLog("game created between ", match.player1.user.username, match.player2.user.username, newRoom.toString())
            
            this.clientRooms.set(match.player1.socket.id, newRoom)
            if (match.player2.user.IntraId !== 2147483647)
                this.clientRooms.set(match.player2.socket.id, newRoom)
            newRoom.on("End", async (room : Room) => {
                await this.setGameResult(room, undefined)
                customLog("EndGame")
            })
        }
    }



    //####################################################################
    //####################################################################
    //########### Remove
    //####################################################################
    //####################################################################


    async removeClient(socket : Socket) {
        let room = this.clientRooms.get(socket.id)
        const user : User = (socket as any).user;
        if (room) {
            customLog(clc.red("remove room"), room.toString())
            this.classicQueue.popClient(user.id);
            this.threeQueue.popClient(user.id);
            this.clientRooms.delete(room.roomId)
            await this.setGameResult(room, socket)
            room.stopByLeaving(socket)
        }
        customLog(clc.bgBlue("remove player"))
        customLog(clc.bgGreen("classicQueue"))
        this.classicQueue.print()
        customLog(clc.bgGreen("threeQueue"))
        this.threeQueue.print()
    }


    //####################################################################
    //####################################################################
    //########### Events
    //####################################################################
    //####################################################################

    hitBall(payload : HitBallI, socketId : string) {
        let room : ThreeRoom = this.clientRooms.get(socketId) as ThreeRoom
        room?.receiveHitBall(payload, socketId)
    }

    racketMove(payload : RacketMoveI, socketId : string) {
        let room : ThreeRoom = this.clientRooms.get(socketId) as ThreeRoom
        room?.sendRacketMove(payload, socketId)
    }

    paddleMove(payload : MovePaddleI, socketId : string) {
        let room : ClassicRoom = this.clientRooms.get(socketId) as ClassicRoom
        room?.receivePaddleMove(payload, socketId)
    }

}
