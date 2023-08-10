import { CallBackFun, Room } from "./Room";
import { Socket } from 'socket.io';
import { Game as ThreeGame } from '../PingPongGames/3dGame/Game'
import { PlayerScores } from "../../dto/player-scores.dto";
import { GameService } from "../../game.service";
import { RacketMoveI } from "../../interfaces/racket-move.interface";
import { HitBallI } from "../../interfaces/hit-ball.interface";
import { customLog } from "src/Const";
import { AClient } from "../../class/AClinet";

export class ThreeRoom extends Room {

    threeGame : ThreeGame

    constructor(roomId : string, player1 : AClient, player2 : AClient, isBotGame : boolean) {
        super(roomId, player1, player2, isBotGame)
        this.roomType = 1
    
   
        this.sendBallInfo = this.wrapMethod(this.sendBallInfo)
        this.sendRacketMove = this.wrapMethod(this.sendRacketMove)
        this.sendBotRacketInfo = this.wrapMethod(this.sendBotRacketInfo)
        this.sendGameScore = this.wrapMethod(this.sendGameScore)
        this.sendTurn = this.wrapMethod(this.sendTurn)
        this.receiveHitBall = this.wrapMethod(this.receiveHitBall)

        this.game = new ThreeGame(this, isBotGame)
        this.threeGame = this.game as ThreeGame
        this.start()

    }


//=============== Send

    sendBallInfo(payload : any) {
        let player2Data = {
            position : {
                x: -payload.position.x,
                y: payload.position.y,
                z: -payload.position.z,
            },
            velocity : {
                x: -payload.velocity.x,
                y: payload.velocity.y,
                z: -payload.velocity.z,
            },
            init : payload.init,
            net : payload.net,
            spotPos : undefined,
            end : payload.end
        }
        if (payload.spotPos) {
            player2Data.spotPos = {
                x: -payload.spotPos.x,
                y: payload.spotPos.y,
                z: -payload.spotPos.z
            }
        }
    
        this.broadCast("ballInfo", payload, player2Data)
    }

    sendRacketMove(payload : RacketMoveI, socketId : string) {
        if (this.isBotGame)
            return
        let player2 = this.getPlayer2Id(socketId)
        if (socketId === this.player1.socket.id)
            this.threeGame.racketP1.set(-payload.position.x, payload.position.y, -payload.position.z)
        if (socketId === this.player2.socket.id)
            this.threeGame.racketP2.set(payload.position.x, payload.position.y, payload.position.z)
        player2.emit("moveRacket", payload)
    }
    
    sendBotRacketInfo(payload : any) {
        this.player1.socket.emit("moveRacket", payload)
    }

    async setGameScore(payload : PlayerScores) {
        let p = {
            score: [payload.player1Score, payload.player2Score]
        }
        let player2Data = {
            score : p.score.reverse()
        }
        await this.sendGameScore(p, player2Data)
    }

    sendTurn(payload : any) {
        this.broadCast("turn", payload, payload)
    }




//=============== Receive

    receiveHitBall(payload : HitBallI, socketId : string) {
        let playerType = (this.player1.socket.id === socketId ? -1 : 1)
        payload.playerType = playerType
        this.threeGame.ballObj.socketReceiveHit(payload)
    }

   

}
