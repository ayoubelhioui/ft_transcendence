

import { Injectable, NotFoundException, UnauthorizedException, UseFilters } from '@nestjs/common';
import { GameService } from './game.service';
import { Server, Socket} from 'socket.io';
import { ClassicRoom } from './game-components/Room/ClassicRoom';
import { ThreeRoom } from './game-components/Room/ThreeRoom';
import * as clc from 'cli-color';
import { UserService } from '../user/user.service';
import { Room } from './game-components/Room/Room';
import { User } from 'src/database/entities';
import { PlayerJoin } from './interfaces/play-join.interface';
import { Player } from './interfaces/player.interface';
import { RacketMoveI } from './interfaces/racket-move.interface';
import { HitBallI } from './interfaces/hit-ball.interface';
import { MovePaddleI } from './interfaces/move-paddle.interface';
import { FriendsService } from '../friends/friends.service';
import { customLog } from 'src/Const';


const botGame = true;

// @UseFilters(WebSocketExceptionFilter)
@Injectable()
export class GameSessions {
    

    BOT : User | undefined = undefined;
    clients : string[] = []
    clientRooms = new Map<string, any>()
    roomsIdMap = new Map<string, any>()
    classicRoom : ClassicRoom;
    threeRoom : ThreeRoom;
    constructor(
        private readonly gameService: GameService | undefined,
        private readonly userService: UserService | undefined,
        private readonly friendsService : FriendsService,
        ) {
        this.classicRoom = undefined
        this.threeRoom = undefined
    }

    //! check all the function that may throw to clean after it

    async init()
    {
        if(!this.BOT)
            this.BOT = await this.userService.findById(2147483647);
    }

    //####################################################################
    //####################################################################
    //########### Add
    //####################################################################
    //####################################################################

    async createNewRoom(payload : PlayerJoin, isClassic : boolean, isBotMode : boolean) {
        let game = await this.gameService.createGame(payload.user, payload.isClassic);
        if (game.exists === 1) {
            throw new Error("Game already playing")
        }
        customLog("game message: ", game)
        let roomId : string = game.inviteId
        let callBack = async (room : ClassicRoom | ThreeRoom) => {
            customLog("end-game callback")
            await this.gameEndRemoveClients(room)
        }
        return (isClassic === true ? new ClassicRoom(roomId, isBotMode, this.gameService, callBack) : new ThreeRoom(roomId, isBotMode, this.gameService, callBack))
    }


    async addPlayerToBotRoom(payload : PlayerJoin) {
        let room = await this.createNewRoom(payload, payload.isClassic, botGame)
        customLog("===> ", room.toString())
        return (room)
    }

    async addPlayerToMultiPlayerRoom(payload : PlayerJoin) {
        let room : ClassicRoom | ThreeRoom | undefined = undefined
        
        if (payload.userToInvite) {
           const user2Invite = await this.userService.findById(payload.userToInvite)
           if(!user2Invite)
                throw new NotFoundException("User doesn't exist")
           const blocking = await this.friendsService.blocking_exists(user2Invite,payload.user)
           if(blocking)
                throw new UnauthorizedException("yall are blocked");
           room = await this.createNewRoom(payload, payload.isClassic, !botGame)
           room.setAsInviteRoom(payload.user.id, payload.userToInvite)
           customLog(clc.bold(`Invite to roomId : ${room.roomId} from user ${payload.user.id} to ${payload.userToInvite}`))
           payload.invite_callback(payload.userToInvite, room.roomId)
        } else if (payload.token) {
            if (this.roomsIdMap.has(payload.token)) {
                //check the client is the same as the user that supposed to be invited
                room = this.roomsIdMap.get(payload.token)
                if (!(room.inviteInfo.isInviteRoom === true && room.inviteInfo.player2Id === payload.user.id)) {
                    customLog(clc.red("error 5ona is not the same as the user that supposed to be invited"), room.toString())
                    throw new UnauthorizedException ("this invite ain't for you braaah")
                }
            } else {
                customLog(clc.red("error the room not found"))
                throw new NotFoundException("game doesn't exist")
            }
        } else {
            if (payload.isClassic) {
                if (this.classicRoom && !this.classicRoom.closed) {
                    room = this.classicRoom
                } else {
                    room = await this.createNewRoom(payload, payload.isClassic, !botGame)
                    this.classicRoom = room as ClassicRoom
                }
            } else {
                if (this.threeRoom && !this.threeRoom.closed) {
                    room = this.threeRoom
                } else {
                    room = await this.createNewRoom(payload, payload.isClassic, !botGame)
                    this.threeRoom = room as ThreeRoom
                }
            }
        }
        return room
    }

    async addClientToWatch(payload : PlayerJoin, client : Socket) {
        if (this.roomsIdMap.has(payload.token)) {
            const socketId = client.id
            const room = this.roomsIdMap.get(payload.token) as Room
            room.addClientToWatch(payload, client)
            this.clientRooms.set(socketId, room)
            this.clients.push(socketId)
            this.roomsIdMap.set(room.roomId, room)
            customLog(clc.bgMagenta(`Watcher ${payload.user.id} to room ${room.toString()}`))
        } else {
            customLog(clc.red("error the room not found"))
            customLog(Array.from(this.roomsIdMap.keys()))
            throw new NotFoundException("game doesn't exist")
        }
    }

    async addClient(payload : PlayerJoin, client : Socket) {
        await this.init();

        const socketId = client.id
        if (!(socketId in this.clients)) {
            customLog(
                clc.green("Adding new Client => "), 
                clc.green("socketId: "), client.id,
                clc.green("IsBotMode: "), payload.isBotMode,
                clc.green("IsClassic: "), payload.isClassic,
                clc.green("IsWatchMode: "), payload.isWatchMode,
                clc.green("UserToInvite: "), payload.userToInvite,
                clc.green("token: "), payload.token,
                clc.green("userId: "), payload.user.id
            )
            if (payload.isWatchMode === true) {
                this.addClientToWatch(payload, client)
            } else {
                let room : ClassicRoom | ThreeRoom | undefined
                if (payload.isBotMode === true) {
                    room = await this.addPlayerToBotRoom(payload)
                } else {

                    room = undefined
                    try {
                        room = await this.addPlayerToMultiPlayerRoom(payload)
                    } catch (error : any) {
                        client.emit("exception", {status : error.status , message : error.message})
                        return
                    }
                }
                
                if (room) {
                    room.add(payload, client)
                    customLog(clc.bgBlue("Player Enter To Room: "), room.toString())
                    this.clientRooms.set(socketId, room)
                    this.clients.push(socketId)
                    this.roomsIdMap.set(room.roomId, room)
                    if (room.closed) {
                        if (payload.isBotMode === true) {
                            await this.gameService.joinGame(this.BOT, room.roomId)
                        } else {
                            //console.log(clc.bgBlue("Players of the room: "), room.player1.id, room.player2.id)
                            await this.gameService.joinGame(room.player2.user, room.roomId)
                        }
                        customLog(clc.green(`Start playing ${room.toString()}`))
                        setTimeout((r : ClassicRoom | ThreeRoom) => r.start(), 1000, room)
                    }
                }
            }
        }
    }


    //####################################################################
    //####################################################################
    //########### Remove
    //####################################################################
    //####################################################################

    removeClientFromList(room : Room, player : Player) {
        customLog(
            clc.red("Remove Player: ", player.user.id),
            clc.red("socket Id: "), player.socket.id,
            clc.red("Room: "), room.toString()
            )
        this.clients.splice(this.clients.indexOf(player.socket.id), 1);
        this.clientRooms.delete(player.socket.id)
        if (this.roomsIdMap.has(room.roomId)) {
            this.roomsIdMap.delete(room.roomId)
            for (let w in room.watchers) {
                this.clients.splice(this.clients.indexOf(w), 1);
            }
        }
        if (room === this.classicRoom || room === this.threeRoom) {
            if (room.player1 === player)
                room.player1 = undefined
        }
    }

    
    removeClientFromWatchers(room : ClassicRoom | ThreeRoom, client : Socket) {
        customLog(clc.red("Remove Watcher: "))
        room.removeClientFromWatch(client)
        this.clientRooms.delete(client.id)
        this.clients.splice(this.clients.indexOf(client.id), 1);
    }

    async setGameResult(client : Socket, player1Id : number, roomId : string, score1 : number, score2 : number) {
        try {
            customLog(clc.bgRed("set game result of:"), roomId)
            await this.gameService.setGameResult(player1Id, roomId ,score1 ,score2);
        } catch(e : any) {
            customLog("setGameResult error: ", e.message)
            client.emit("exception", e.message)
        }
    }

    async removePlayers(room : ClassicRoom | ThreeRoom, client : Socket) {
        room.playerLeft(client)
        if (room.isBotMode === true) {
            await this.setGameResult(client, room.player1.id, room.roomId ,0 ,5);
            this.removeClientFromList(room, room.player1)
        } else {
            let player1 = room.player1
            let player2 = room.player2
            if(player1 && player2) {
                let userGone = room.player1.socket.id === client.id ? room.player1 : room.player2
                await this.setGameResult(client, userGone.id, room.roomId ,0 ,5);
            }
            else if (!player2) {
                const existingGame = await this.gameService.findGame(room.roomId);
                if(existingGame)
                    this.gameService.deleteGame(existingGame);
            }
            player1 && this.removeClientFromList(room, room.player1)
            player2 && this.removeClientFromList(room, room.player2)
        }
    }

    async gameEndRemoveClients(room : ClassicRoom | ThreeRoom) {
        await this.gameService.setGameResult(room.player1.id, room.roomId ,
            room.game.gameInfo.scorePlayer1, room.game.gameInfo.scorePlayer1);
        room.player1 && this.removeClientFromList(room, room.player1)
        room.player2 && this.removeClientFromList(room, room.player2)
    }

    async removeClient(client : Socket) {
        customLog(clc.red("removeClient"))
        if (this.clientRooms.has(client.id)) {
            let room : ClassicRoom | ThreeRoom = this.clientRooms.get(client.id)
            if (room.watchers.has(client.id)) {
                this.removeClientFromWatchers(room, client)
            } else {
                await this.removePlayers(room, client)
            }
        }
    }

    //=====================================

    hitBall(payload : HitBallI, socketId : string) {
        let room : ThreeRoom = this.clientRooms.get(socketId)
        room?.receiveHitBall(payload, socketId)
    }

    racketMove(payload : RacketMoveI, socketId : string) {
        let room : ThreeRoom = this.clientRooms.get(socketId)
        room?.sendRacketMove(payload, socketId)
    }

    paddleMove(payload : MovePaddleI, socketId : string) {
        let room : ClassicRoom = this.clientRooms.get(socketId)
        room?.receivePaddleMove(payload, socketId)
    }

    async leaveGame(socket : Socket) {
        await this.removeClient(socket)
    }

}
