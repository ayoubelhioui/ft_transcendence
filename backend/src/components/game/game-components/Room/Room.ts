import { Socket } from 'socket.io';
import { PlayerScores } from '../../dto/player-scores.dto';
import { PlayerJoin } from '../../interfaces/play-join.interface';
import { Client } from 'socket.io/dist/client';
import { Watcher } from '../../interfaces/watcher.interface';
import { ThreeRoom } from './ThreeRoom';
import { AClient } from '../../class/AClinet';
import { ClassicRoom } from './ClassicRoom';
import { Game as ClassicGame } from '../PingPongGames/ClassicGame/Game'
import { Game as ThreeGame } from '../PingPongGames/3dGame/Game'
import { customLog } from 'src/Const';
import { RoomEvent, RoomEventFunction } from '../../interfaces/room-events';

export type CallBackFun = (room : ThreeRoom | ClassicRoom) => Promise<void>

export class Room {

    protected game : ClassicGame | ThreeGame | undefined = undefined
    roomId : string
    roomType : number = -1
    isBotGame : boolean
    player1 : AClient;
    player2 : AClient;
    isFinished : boolean
    watchers : Map<string, Watcher> = new Map()
    events : RoomEvent = {
        onStop : undefined
    }


    constructor(roomId : string, player1 : AClient, player2 : AClient, isBotGame : boolean) {
        this.roomId = roomId
        this.player1 = player1
        this.player2 = player2
        this.isBotGame = isBotGame
        this.isFinished = false
    }

    wrapMethod(originalMethod: any) {
        return function (...args: any[]) {
            if (this.closed === false || !this.game || this.game.gameInfo.end === true) {
                //customLog("no")
                return
            }
            return originalMethod.apply(this, args);
        };
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
        if (this.isBotGame === false)
            this.player2.socket.emit(event, payload2)
    }

    sendToOther(event : string, socket : Socket, payload : any) {
        const player2 = this.getPlayer2Id(socket.id)
        player2?.emit(event, payload)
    }



    toString() {
        let type = this.roomType === 0 ? "Classic" : "Three"
        let bot = this.isBotGame ? "Bot" : "Multi"
        return `${type} Room ${this.roomId} Type : ${bot} users ${this.player1?.user.username} ${this.player2?.user.username}`
    }


    //=================================================================================

    protected start() {
        this.game.gameLoop() 

        if (this.isBotGame === false) {
            this.broadCast(
                "start", 
                {turn: 0, id: this.player1.socket.id, name1 : this.player1.user.username, name2 : this.player2.user.username}, 
                {turn: 1, id: this.player2.socket.id, name1 : this.player2.user.username, name2 : this.player1.user.username}
            )
        } else {
            this.broadCast(
                "start", 
                {turn: 0, id: this.player1.socket.id},
                undefined
            )
        }
    }

   
    stopByLeaving(leaver : Socket) {
        customLog("Stop Game")
        if (this.player1 && this.player2) {
            this.sendToOther("end_game", leaver, { isWin : true })
        }
        if (this.isBotGame === false) {
            this.sendToOther("end_game", leaver, { isWin : true })
        }
        this.game.stop()
    }
  


    async on(event : string, callBack : RoomEventFunction) {
        if (event === "End") {
            this.events.onStop = callBack
        }
    }

    private gameScoreTrigger(player1Score, player2Score) {
        let maxScore = 1
        if(player1Score == maxScore || player2Score == maxScore)
        {
            return (true)
        }
        return (false)
    }
    
    getScore() {
        let player1Score = this.game.gameInfo.scorePlayer1
        let player2Score = this.game.gameInfo.scorePlayer2
        return {
            player1Score,
            player2Score
        }
    }


    async sendGameScore(payloadForPlayer1 : any, payloadForPlayer2 : any) {
        const player1Score = payloadForPlayer1.score[0]
        const player2Score = payloadForPlayer1.score[1]
        this.broadCast("gameScore", payloadForPlayer1, payloadForPlayer2)
        const res = this.gameScoreTrigger(player1Score, player2Score)
        customLog("gameScore", payloadForPlayer1, payloadForPlayer2, res)
        if (res) {
            const player1IsWin = (player1Score > player2Score)
            this.broadCast("end_game", {isWin : player1IsWin}, {isWin : !player1IsWin})
            console.log("Stop game")
            this.game.stop()
            await this.events.onStop?.(this)
        }
    }

}
