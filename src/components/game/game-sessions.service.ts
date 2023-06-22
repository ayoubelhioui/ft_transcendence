

import { Injectable, NotFoundException } from '@nestjs/common';
import { GameService } from './game.service';
import { Server, Socket} from 'socket.io';
import { Room } from './game-components/Room';
import * as clc from 'cli-color';

const playerGame = false;
const botGame = true;


@Injectable()
export class GameSessions {
    
    clients : string[] = []
    clientRooms = new Map()
    room : Room;
    constructor(private readonly gameService: GameService) {
        
        this.room = new Room(playerGame);
 
    }

    addPlayer(payload : any, client : Socket) {
        const socketId = client.id
        if (!(socketId in this.clients)) {
            if (payload.botMode === true) {
                let newBotRoom = new Room(botGame)
                //!bot game create >> creates game token
                console.log(`Client ${socketId} added to Bot room nb ${newBotRoom.roomId}`)
                newBotRoom.add(payload, client)
                this.clients.push(socketId)
                this.clientRooms.set(socketId, newBotRoom)
                let m = clc.green(`Start playing between ${socketId} and Bot room ${newBotRoom.roomId} => nbRooms ${this.clientRooms.size / 2}`)
                console.log(m)
                newBotRoom.start()
            } else {
                console.log(`Client ${socketId} added to room nb ${this.room.roomId}`)
                this.room.add(payload, client)
                this.clients.push(socketId)
                this.clientRooms.set(socketId, this.room)
                if (this.room.closed) {
                    //!join >> give game token to join
                    let m = clc.green(`Start playing between ${this.room.player1.id} and ${this.room.player2.id} room ${this.room.roomId} => nbRooms ${this.clientRooms.size / 2}`)
                    console.log(m)
                    this.room.start()
                    this.room = new Room(playerGame)    
                } else {
                    //!create
                }
            }
        }
    }


    removePlayer(client : Socket) {
        let room = this.clientRooms.get(client.id)
        if (room) {
            if (room.botMode === true) {
                let player1 = room.player1

                if (player1) {
                    room.playerLeft(client)
                    //!bot room is closed , player1 surrender
                    console.log(`Client ${player1.clientId} removed, bot room nb ${room.roomId}`)
                    this.clients.splice(this.clients.indexOf(player1.clientId), 1);
                    this.clientRooms.delete(player1.clientId)
                }
            } else {
                let player1 = room.player1
                let player2 = room.player2
        
                room.playerLeft(client)
                //!client surrender if player2 is defined 
                //!if player2 undefined, just delete game
                if (player1) {
                    console.log(`Client ${player1.clientId} removed, room nb ${room.roomId}`)
                    this.clients.splice(this.clients.indexOf(player1.clientId), 1);
                    this.clientRooms.delete(player1.clientId)
                    if (room === this.room) {
                        this.room.player1 = undefined
                    }
                }
                if (player2) {
                    console.log(`Client ${player2.clientId} removed, room nb ${room.roomId}`)
                    this.clients.splice(this.clients.indexOf(player2.clientId), 1);
                    this.clientRooms.delete(player2.clientId)
                    if (room === this.room) {
                        this.room.player2 = undefined
                    }
                }
            }
        }
    }

}
