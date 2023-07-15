

import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { GameService } from './game.service';
import { Server, Socket} from 'socket.io';
import { ClassicRoom } from './game-components/Room/ClassicRoom';
import { ThreeRoom } from './game-components/Room/ThreeRoom';
import * as clc from 'cli-color';
import { PlayerJoinDto } from './dto/play-join.dto';
import { gameTypesNames } from 'src/global/types/game-types';
import { UserService } from '../user/user.service';
import { Room } from './game-components/Room/Room';
import { User } from 'src/database/entities';
import { WebSocketExceptionFilter } from '../socket/websocket-exception.filter';
import { PlayerJoin } from './interfaces/play-join.interface';
import { Player } from './interfaces/player.interface';


const botGame = true;

// @UseFilters(WebSocketExceptionFilter)
@Injectable()
export class GameSessions {
    

    BOT : User | undefined = undefined;
    clients : string[] = []
    clientRooms = new Map()
    roomsIdMap = new Map()
    classicRoom : ClassicRoom;
    threeRoom : ThreeRoom;
    constructor(
        private readonly gameService: GameService,
        private readonly userService: UserService
        ) {
        this.classicRoom = new ClassicRoom(!botGame, this.gameService);
        this.threeRoom = new ThreeRoom(!botGame, this.gameService);
    }

    //!test dto
    //!game finish, set result
    //! async >> await the function
    //!when the room is created it will generate the game token it will be the roomId
    //!end-point to get the token


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

    createNewMultiPlayerRoom(isClassic : boolean) {
        return (isClassic === true ? new ClassicRoom(!botGame, this.gameService) : new ThreeRoom(!botGame, this.gameService))
    }

    async addPlayerToBotRoom(payload : PlayerJoin) {
        let room = payload.isClassic ? new ClassicRoom(botGame, this.gameService) : new ThreeRoom(botGame, this.gameService)
        return (room)
    }

    async addPlayerToMultiPlayerRoom(payload : PlayerJoin) {
        let room = payload.isClassic === true ? this.classicRoom : this.threeRoom
        if (payload.userToInvite) {
           room = this.createNewMultiPlayerRoom(payload.isClassic)
           //!send the game token to the other plater
        } else if (payload.token) {
            if (this.roomsIdMap.has(payload.token)) {
                //!check the client is the same as the user the supposed to be invited
                if (true) {
                    room = this.roomsIdMap.get(payload.token)
                } else {
                    //!error 5ona is not the same as the user that supposed to be invited 
                }
            } else {
                //!error the room not found
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
        }
    }

    async addClient(payload : PlayerJoin, client : Socket) {
        await this.init();

        const socketId = client.id
        if (!(socketId in this.clients)) {
            console.log(
                clc.blue("Adding new Client => "), 
                "socket Id", client.id,
                "Info: Bot", payload.isBotMode,
                "IsClassic: ", payload.isClassic,
                "IsWatchMode: ", payload.isWatchMode,
                "IsInvite: ", payload.userToInvite,
                "token", payload.token,
                "userId", payload.user.id
            )
            if (payload.isWatchMode === true) {
                this.addClientToWatch(payload, client)
            } else {
                let room : ClassicRoom | ThreeRoom
                if (payload.isBotMode === true) {
                    room = await this.addPlayerToBotRoom(payload)
                } else {
                    room = await this.addPlayerToMultiPlayerRoom(payload)
                }
                console.log(clc.bgBlue("Player Enter To Room: "), room.toString())
                room.add(payload, client)
                this.clientRooms.set(socketId, room)
                this.clients.push(socketId)
                this.roomsIdMap.set(room.roomId, room)
                if (room.closed) {
                    let m = clc.green(`Start playing`)
                    console.log(m)
                    if (payload.isBotMode === false) {
                        if (payload.isClassic)
                            this.classicRoom = new ClassicRoom(!botGame, this.gameService)
                        else
                            this.threeRoom = new ThreeRoom(!botGame, this.gameService)
                    }
                    setTimeout((r : ClassicRoom | ThreeRoom) => r.start(), 1000, room)
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
        console.log(clc.red("Remove Player"))
        this.clients.splice(this.clients.indexOf(player.socket.id), 1);
        this.clientRooms.delete(player.socket.id)
        this.roomsIdMap.delete(room.roomId)
        if (room === this.classicRoom || room === this.threeRoom) {
            if (room.player1 === player)
                room.player1 = undefined
        }
    }

    removeClientFromWatchers(room : ClassicRoom | ThreeRoom, client : Socket) {
        room.removeClientFromWatch(client)
        this.clientRooms.delete(client.id)
        this.clients.splice(this.clients.indexOf(client.id), 1);
        this.roomsIdMap.delete(room.roomId)
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

    hitBall(payload : any, socketId : string) {
        let room : ThreeRoom = this.clientRooms.get(socketId)
        room?.receiveHitBall(payload, socketId)
    }

    racketMove(payload : any, socketId : string) {
        let room : ThreeRoom = this.clientRooms.get(socketId)
        room?.sendRacketMove(payload, socketId)
    }

    paddleMove(payload : any, socketId : string) {
        let room : ClassicRoom = this.clientRooms.get(socketId)
        room?.receivePaddleMove(payload, socketId)
    }

}
