

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

    async addPlayerToBotRoom(payload : PlayerJoin) {
        let newBotRoom = payload.isClassic ? new ClassicRoom(botGame, this.gameService) : new ThreeRoom(botGame, this.gameService)
        return (newBotRoom)
    }

    async addPlayerToMultiPlayerRoom(payload : PlayerJoin) {
        let room = payload.isClassic === true ? this.classicRoom : this.threeRoom
        if (payload.userToInvite) {
           room = payload.isClassic === true ? new ClassicRoom(!botGame, this.gameService) : new ThreeRoom(!botGame, this.gameService)
           //!send the game token to the other plater
        } else if (payload.token) {
            if (this.roomsIdMap.has(payload.token)) {
                //!check the client is the same as the user the supposed to be invited
                if (true) {
                    
                } else {
                    //!error 5ona is not the same as the user that supposed to be invited 
                }
            } else {
                //!error the room not found
            }
        }
        
        
        if (payload.token && this.roomsIdMap.has(payload.token)) {
            room = this.roomsIdMap.get(payload.token)
        } else if (payload.token) {
            //!Error the room not exited
        }

        if (room.closed === true) {
            if (payload.isClassic)
                this.classicRoom = new ClassicRoom(!botGame, this.gameService)
            else
                this.threeRoom = new ThreeRoom(!botGame, this.gameService)
        }
        return room
    }

    async addClientToWatch(payload : PlayerJoin, client : Socket) {

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
                "IsInvite: ", payload.isInvite,
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
                room.add(payload, client)
                this.clientRooms.set(socketId, room)
                this.clients.push(socketId)
                this.roomsIdMap.set(room.roomId, room)
                if (room.closed) {
                    let m = clc.green(`Start playing`)
                    console.log(m)
                    setTimeout((r : ClassicRoom | ThreeRoom) => r.start(), 500, room)
                }
            }
        }
    }


    //####################################################################
    //####################################################################
    //########### Remove
    //####################################################################
    //####################################################################


    async removeClient(client : Socket) {
        let room : ClassicRoom | ThreeRoom = this.clientRooms.get(client.id)
        if (room) {
            if (room.isBotMode === true) {
                let player1 = room.player1

                if (player1) {
                    room.playerLeft(client)
                    //!bot room is closed , player1 surrender
                    {
                        // await this.gameService.setGameResult(player1.id, room.gameToken ,0,5);
                    }
                    console.log(`Client ${player1.id} removed, bot room nb ${room.roomId}`)
                    this.clients.splice(this.clients.indexOf(player1.socket.id), 1);
                    this.clientRooms.delete(player1.socket.id)
                }
            } else {
                console.log("removing: ", client.id, "Room =>  ", room.closed)
                let player1 = room.player1
                let player2 = room.player2
                let userGone = player1.socket.id === client.id ? player1 : player2
        
                room.playerLeft(client)
                //!client surrender if player2 is defined 
                //!if player2 undefined, just delete game
                if(player1 && player2)
                {
                    // await this.gameService.setGameResult(userGone.id, room.gameToken ,0,5);
                }
                else if(!player2)
                {
                    const existingGame = await this.gameService.findGame(room.gameToken);
                    if(existingGame)
                        this.gameService.deleteGame(existingGame);
                }
            
                if (player1) {
                    console.log(`Client ${player1.socket.id} removed, room nb ${room.roomId}`)
                    this.clients.splice(this.clients.indexOf(player1.socket.id), 1);
                    this.clientRooms.delete(player1.socket.id)
                    if (room === this.classicRoom) {
                        this.classicRoom.player1 = undefined
                    }
                    if (room === this.threeRoom) {
                        this.threeRoom.player1 = undefined
                    }
                }
                if (player2) {
                    console.log(`Client ${player2.id} removed, room nb ${room.roomId}`)
                    this.clients.splice(this.clients.indexOf(player2.socket.id), 1);
                    this.clientRooms.delete(player2.socket.id)
                    if (room === this.classicRoom) {
                        this.classicRoom.player2 = undefined
                    }
                    if (room === this.threeRoom) {
                        this.threeRoom.player2 = undefined
                    }
                }
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
