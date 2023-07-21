import { Socket } from 'socket.io';
import { Player } from '../../interfaces/player.interface';
import { PlayerScores } from '../../dto/player-scores.dto';
import { GameService } from '../../game.service';
import { PlayerJoin } from '../../interfaces/play-join.interface';
import { Client } from 'socket.io/dist/client';
import { Watcher } from '../../interfaces/watcher.interface';
import { ClassicRoom } from './ClassicRoom';
import { ThreeRoom } from './ThreeRoom';

export type CallBackFun = (room : ThreeRoom | ClassicRoom) => Promise<void>

export class Room {

    static roomId : number = 0

    roomId = Room.roomId
    roomType : number = -1
    isBotMode : boolean
    player1 : Player | undefined = undefined;
    player2 : Player | undefined = undefined;
    watchers : Map<string, Watcher> = new Map()
    closed : Boolean = false
    callBack : CallBackFun
    gameToken : string; //!game token is the same as roomId
    protected gameService : GameService

    inviteInfo = {
        isInviteRoom : false,
        player1Id : -1,
        player2Id : -1,
    }

    

    constructor(isBotMode : boolean, gameService : GameService, callBack : CallBackFun) {
        this.isBotMode = isBotMode
        this.gameService = gameService
        this.callBack = callBack
        if (this.isBotMode)
            this.closed = true
        Room.roomId++
    }

    wrapMethod(originalMethod: any) {
        return function (...args: any[]) {
            if (this.closed === false || !this.game || this.game.gameInfo.end === true) {
                //console.log("no")
                return
            }
            return originalMethod.apply(this, args);
        };
    }

    setAsInviteRoom(player1Id : number, player2Id : number) {
        this.inviteInfo.player1Id = player1Id
        this.inviteInfo.player2Id = player2Id
        this.inviteInfo.isInviteRoom = true
    }

    add(payload: PlayerJoin, socket : Socket) {
        let newPlayer : Player = {
            id : payload.user.id,
            socket : socket,
            user : payload.user
        }
        if (this.player1 === undefined)
            this.player1 = newPlayer
        else if (this.player2 === undefined)
            this.player2 = newPlayer
        if (this.player1 && this.player2) {
            this.closed = true
        }
    }

    addClientToWatch(payload : PlayerJoin, socket : Socket) {
        let newPlayer : Watcher = {
            id : payload.user.id,
            socket : socket,
            user : payload.user
        }
        this.watchers.set(newPlayer.socket.id, newPlayer)
        socket.join("Room" + this.roomId)
    }

    removeClientFromWatch(socket : Socket) {
        socket.leave("Room" + this.roomId)
        this.watchers.delete(socket.id)
    }

    getPlayer2Id(socketId : string) : Socket {
        if (socketId === this.player1.socket.id)
            return (this.player2.socket)
        return (this.player1.socket)
    }

    broadCast(event : string, payload1 : any, payload2 : any) {
        this.player1.socket.emit(event, payload1)
        if (this.isBotMode === false)
            this.player2.socket.emit(event, payload2)
    }

    sendToOther(event : string, socket : Socket, payload : any) {
        if (this.closed === false)
            return
        const player2 = this.getPlayer2Id(socket.id)
        player2.emit(event, payload)
    }

    gameScoreTrigger(scores : PlayerScores) {
        let maxScore = 1
        if(scores.player1Score == maxScore || scores.player2Score == maxScore)
        {
            return (false)
        }
        return (false)
    }

    toString() {
        let type = this.roomType === 0 ? "Classic" : "Three"
        let invite = this.inviteInfo.isInviteRoom ? `Invite (${this.inviteInfo.player1Id}, ${this.inviteInfo.player2Id})` : ""
        let bot = this.isBotMode ? "Bot" : "Multi"
        return `${type} Room ${this.roomId} Type : ${bot} ${invite}`
    }
}