

import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
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


const botGame = true;

// @UseFilters(WebSocketExceptionFilter)
@Injectable()
export class GameSessions {
    

    BOT : User | undefined = undefined;
    clients : string[] = []
    clientRooms = new Map<string, any>()
    roomsIdMap = new Map<number, any>()
    classicRoom : ClassicRoom;
    threeRoom : ThreeRoom;
    constructor(
        private readonly gameService: GameService,
        private readonly userService: UserService
        ) {
        this.classicRoom = this.createNewRoom(true, !botGame) as ClassicRoom;
        this.threeRoom = this.createNewRoom(false, !botGame) as ThreeRoom;
    }

    //!test dto
    //!game finish, set result
    //! async >> await the function
    //!when the room is created it will generate the game token it will be the roomId
    //!end-point to get the token

    //!when the game is end remove room and client from game-session

    async init()
    {
        if(!this.BOT)
            this.BOT = await this.userService.findUserById(1);
    }

    //####################################################################
    //####################################################################
    //########### Add
    //####################################################################
    //####################################################################

    createNewRoom(isClassic : boolean, isBotMode : boolean) {
        let callBack = async (room : ClassicRoom | ThreeRoom) => {
            //!game End
            console.log("end-game callback")
            await this.gameEndRemoveClients(room)
        }
        return (isClassic === true ? new ClassicRoom(isBotMode, this.gameService, callBack) : new ThreeRoom(isBotMode, this.gameService, callBack))
    }


    async addPlayerToBotRoom(payload : PlayerJoin) {
        let room = this.createNewRoom(payload.isClassic, botGame)
        return (room)
    }

    async addPlayerToMultiPlayerRoom(payload : PlayerJoin) {
        let room = payload.isClassic === true ? this.classicRoom : this.threeRoom
        //!userToInvite sameTime token
        if (payload.userToInvite) {
           room = this.createNewRoom(payload.isClassic, !botGame)
           room.setAsInviteRoom(payload.user.id, payload.userToInvite)
           console.log(clc.bold(`Invite to roomId : ${room.roomId} from user ${payload.user.id} to ${payload.userToInvite}`))
           //!send the game token to the other player
        } else if (payload.token) {
            if (this.roomsIdMap.has(payload.token)) {
                //check the client is the same as the user that supposed to be invited
                room = this.roomsIdMap.get(payload.token)
                if (!(room.inviteInfo.isInviteRoom === true && room.inviteInfo.player2Id === payload.user.id)) {
                    console.log(clc.red("error 5ona is not the same as the user that supposed to be invited"), room.toString())
                    //!error 5ona is not the same as the user that supposed to be invited
                    return undefined
                }
            } else {
                console.log(clc.red("error the room not found"))
                //!error the room not found
                return undefined
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
            console.log(clc.bgMagenta(`Watcher ${payload.user.id} to room ${room.toString()}`))
        } else {
            console.log(clc.red("error the room not found"))
            console.log(Array.from(this.roomsIdMap.keys()))
            //!error the room not found
        }
    }

    async addClient(payload : PlayerJoin, client : Socket) {
        await this.init();

        const socketId = client.id
        if (!(socketId in this.clients)) {
            console.log(
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
                    room = await this.addPlayerToMultiPlayerRoom(payload)
                }
                if (room) {
                    console.log(clc.bgBlue("Player Enter To Room: "), room.toString())
                    room.add(payload, client)
                    this.clientRooms.set(socketId, room)
                    this.clients.push(socketId)
                    this.roomsIdMap.set(room.roomId, room)
                    if (room.closed) {
                        let m = clc.green(`Start playing ${room.toString()}`)
                        console.log(m)
                        if (payload.isBotMode === false) {
                            const newRoom = this.createNewRoom(payload.isClassic, !botGame)
                            if (payload.isClassic)
                                this.classicRoom = newRoom as ClassicRoom
                            else
                                this.threeRoom = newRoom as ThreeRoom
                        }
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
        console.log(
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
        console.log(clc.red("Remove Watcher: "))
        room.removeClientFromWatch(client)
        this.clientRooms.delete(client.id)
        this.clients.splice(this.clients.indexOf(client.id), 1);
    }

    async removePlayers(room : ClassicRoom | ThreeRoom, client : Socket) {
        room.playerLeft(client)
        if (room.isBotMode === true) {
            //!bot room is closed , player1 surrender
            // await this.gameService.setGameResult(player1.id, room.gameToken ,0,5);
            this.removeClientFromList(room, room.player1)
        } else {
            let player1 = room.player1
            let player2 = room.player2
            if(player1 && player2)
            {
                //! set game result
                //! One of the players disconnected, resulting in this player being marked as surrendered.
                // await this.gameService.setGameResult(userGone.id, room.gameToken ,0,5);
            }
            else if (!player2) {
                //!remove the game
                // const existingGame = await this.gameService.findGame(room.gameToken);
                // if(existingGame)
                //     this.gameService.deleteGame(existingGame);
            }
            player1 && this.removeClientFromList(room, room.player1)
            player2 && this.removeClientFromList(room, room.player2)
        }
    }

    async gameEndRemoveClients(room : ClassicRoom | ThreeRoom) {
        //!set the game result
        // return await this.gameService.setGameResult(this.player1.id, this.gameToken ,
        //     scores.player1Score, scores.player2Score);
        room.player1 && this.removeClientFromList(room, room.player1)
        room.player2 && this.removeClientFromList(room, room.player2)
    }

    async removeClient(client : Socket) {
        if (this.clientRooms.has(client.id)) {
            let room : ClassicRoom | ThreeRoom = this.clientRooms.get(client.id)
            if (room.watchers.has(client.id)) {
                this.removeClientFromWatchers(room, client)
            } else {
                this.removePlayers(room, client)
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

}
