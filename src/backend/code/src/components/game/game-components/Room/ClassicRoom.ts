import { CallBackFun, Room } from "./Room";
import { Socket } from 'socket.io';
import { Game as ClassicGame } from '../PingPongGames/ClassicGame/Game'
import { PlayerScores } from "../../dto/player-scores.dto";
import { GameService } from "../../game.service";
import { MovePaddleI } from "../../interfaces/move-paddle.interface";
import { customLog } from "src/Const";
import { AClient } from "../../class/AClinet";

export class ClassicRoom extends Room {

    classicGame : ClassicGame

    constructor(roomId : string, player1 : AClient, player2 : AClient, isBotGame : boolean) {
        super(roomId, player1, player2, isBotGame)
        this.roomType = 0

        this.sendBallInfo = this.wrapMethod(this.sendBallInfo)
        this.sendPaddleMove = this.wrapMethod(this.sendPaddleMove)
        this.sendGameScore = this.wrapMethod(this.sendGameScore)
        this.receivePaddleMove = this.wrapMethod(this.receivePaddleMove)

        this.game = new ClassicGame(this, isBotGame)
        this.classicGame = this.game as ClassicGame
        this.start()
    }

  

//=============== Send

    sendBallInfo(payload : any) {
        this.broadCast("ballInfo", payload, payload)
    }

    sendPaddleMove(payload : any) {
        this.broadCast("paddleMove", payload, payload)
    }

    async setGameScore(payload : PlayerScores) {
        let p = {
            score : [payload.player1Score, payload.player2Score]
        }
        this.broadCast("gameScore", p, p)
        this.sendGameScore(p, p)
    }


//=============== Receive

    receivePaddleMove(payload : MovePaddleI, socketId : string) {
        if (socketId === this.player1.socket.id)
            this.classicGame.player1.receivePos(payload)
        else if (socketId === this.player2.socket.id)
            this.classicGame.player2.receivePos(payload)
    }

    
}