

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


const botGame = true;

// @UseFilters(WebSocketExceptionFilter)
@Injectable()
export class GameSessions {
    

    BOT : User | undefined = undefined;
    clients : string[] = []
    clientRooms = new Map()
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


   

    async init()
    {
        if(!this.BOT)
            this.BOT = await this.userService.findUserById(1);
    }

   
    async addPlayer(payload : PlayerJoinDto, client : Socket) {
        await this.init();
        const socketId = client.id
        if (!(socketId in this.clients)) {

            
            console.log(clc.blue("Adding Player: "), client.id)
            if (payload.isBotMode === true) {
                let newBotRoom = payload.isClassic ? new ClassicRoom(botGame, this.gameService) : new ThreeRoom(botGame, this.gameService)
                //!bot game create >> creates game token
                {
                    // const {inviteId} = await this.gameService.createGame(payload.user,payload.isClassic);
                    // await this.gameService.joinGame(this.BOT, payload.token);
                    // newBotRoom.gameToken = inviteId;
                }
                console.log(`Client ${socketId} added to Bot room nb ${newBotRoom.roomId}`)
                newBotRoom.add(payload, client)
                this.clients.push(socketId)
                this.clientRooms.set(socketId, newBotRoom)
                let m = clc.green(`Start playing between ${socketId} and Bot room ${newBotRoom.roomId} => nbRooms ${this.clientRooms.size / 2}`)
                console.log(m)
                newBotRoom.start()
            } else {
                let room = payload.isClassic === true ? this.classicRoom : this.threeRoom
                console.log(`Client ${socketId} added to room nb ${room.toString()}`)
                room.add(payload, client)
                this.clientRooms.set(socketId, room)
                this.clients.push(socketId)
                

                //console.log("Room is Closed => ", room.closed)
                if (room.closed === true) {
                    console.log("Room is Closed => ", room.toString())
                    //!join >> give game token to join
                    {
                        // await this.gameService.joinGame(payload.user, payload.token);
                    }
                    let m = clc.green(`Start playing between ${room.player1.id} and ${room.player2.id} room ${room.roomId} => nbRooms ${this.clientRooms.size / 2}`)
                    console.log(m)
                    room.start()
                    
                    if (payload.isClassic)
                        this.classicRoom = new ClassicRoom(!botGame, this.gameService)
                    else
                        this.threeRoom = new ThreeRoom(!botGame, this.gameService)
                } else {
                    //!create
                    {
                        // const {inviteId} = await this.gameService.createGame(payload.user,payload.isClassic);
                        // console.log(clc.red(inviteId))
                        // room.gameToken = inviteId;
                    }
                }
            }
        }
    }


    async removePlayer(client : Socket) {
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
