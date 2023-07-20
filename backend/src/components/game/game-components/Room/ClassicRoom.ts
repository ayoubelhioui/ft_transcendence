import { CallBackFun, Room } from "./Room";
import { Socket } from 'socket.io';
import { Game as ClassicGame } from '../PingPongGames/ClassicGame/Game'
import { PlayerScores } from "../../dto/player-scores.dto";
import { GameService } from "../../game.service";
import { MovePaddleI } from "../../interfaces/move-paddle.interface";

export class ClassicRoom extends Room {

    game : ClassicGame

    constructor(isBot : boolean, gameService : GameService, callBack : CallBackFun) {
        super(isBot, gameService, callBack)
        this.roomType = 0

        this.sendBallInfo = this.wrapMethod(this.sendBallInfo)
        this.sendPaddleMove = this.wrapMethod(this.sendPaddleMove)
        this.sendGameScore = this.wrapMethod(this.sendGameScore)
        this.broadcastToWatchers = this.wrapMethod(this.broadcastToWatchers)
        this.receivePaddleMove = this.wrapMethod(this.receivePaddleMove)

    }

    start() {
        this.game = new ClassicGame(this, this.isBotMode)
        this.game.gameLoop()

        if (this.isBotMode === false) {
            this.broadCast(
                "start", 
                {turn: 0, id: this.player1.socket.id}, 
                {turn: 1, id: this.player2.socket.id}
            )
        } else {
            this.broadCast(
                "start", 
                {turn: 0, id: this.player1.socket.id},
                undefined
            )
        }
    }

    playerLeft(socket : Socket) {
        if (this.closed === false)
            return
        this.game.stop()
        if (this.isBotMode === false) {
            this.sendToOther("end_game", socket, { isWin : true })
        }
    }

//=============== Send

    sendBallInfo(payload : any) {
        this.broadCast("ballInfo", payload, payload)
    }

    sendPaddleMove(payload : any) {
        this.broadCast("paddleMove", payload, payload)
    }

    async sendGameScore(payload : PlayerScores) {
        let p = {
            score : [payload.player1Score, payload.player2Score]
        }
        if (this.closed === false)
            return
        this.broadCast("gameScore", p, p)
        let res = this.gameScoreTrigger(payload)
        if (res) {
            console.log("end-game")
            const player1IsWin = (payload.player1Score > payload.player2Score)
            this.broadCast("end_game", {isWin : player1IsWin}, {isWin : !player1IsWin})
            this.game.stop()
            await this.callBack(this)
        }
        
    }

    broadcastToWatchers() {
        let data = {
            score : [this.game.gameInfo.scorePlayer1, this.game.gameInfo.scorePlayer2],
            position: this.game.ballObj.position,
            velocity: this.game.ballObj.velocity,
            speed: this.game.ballObj.speed,
            paddlePlayer1 : this.game.player1.position.y,
            paddlePlayer2 : this.game.player2.position.y
        }
        this.player1.socket.to("Room" + this.roomId).emit("live_data", data);
    }

//=============== Receive

    receivePaddleMove(payload : MovePaddleI, socketId : string) {
        if (socketId === this.player1.socket.id)
            this.game.player1.receivePos(payload)
        else if (socketId === this.player2.socket.id)
            this.game.player2.receivePos(payload)
    }

    
}