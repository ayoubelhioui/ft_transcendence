import { Room } from "./Room";
import { Socket } from 'socket.io';
import { Game as ClassicGame } from '../PingPongGames/ClassicGame/Game'
import { PlayerScores } from "../../dto/player-scores.dto";
import { GameService } from "../../game.service";

export class ClassicRoom extends Room {

    game : ClassicGame

    constructor(isBot : boolean, gameService : GameService) {
        super(isBot, gameService)
        this.type = 0
    }

    start() {
        this.game = new ClassicGame(this, this.isBotMode)
        console.log("game is started: ")
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
        //console.log(this.game)
        this.game.stop()
        if (this.isBotMode === false) {
            this.sendToOther("end_game", socket, { isWin : true })
        }
    }

//=============== Send

    sendBallInfo(payload : any) {
        //data.position
        //data.velocity
        this.broadCast("ballInfo", payload, payload)
    }

    sendPaddleMove(payload : any) {
        
        //console.log("paddleMove", payload)
        this.broadCast("paddleMove", payload, payload)
    }

    async sendGameScore(payload : PlayerScores) {
        let p = {
            score : [payload.player1Score, payload.player2Score]
        }
        if (this.closed === false)
            return
        this.broadCast("gameScore", p, p)
        let res = await this.gameScoreTrigger(payload)
        if (res) {
            console.log("end-game")
            const player1IsWin = (payload.player1Score > payload.player2Score)
            this.broadCast("end_game", {isWin : player1IsWin}, {isWin : !player1IsWin})
            this.game.stop()
        }
        
    }

    sendTurn(payload : any) {
        if (this.closed === false)
            return
        this.broadCast("turn", payload, payload)
    }

//=============== Receive

    receivePaddleMove(payload : any, socketId : string) {
        if (socketId === this.player1.socket.id)
            this.game.player1.receivePos(payload)
        else if (socketId === this.player2.socket.id)
            this.game.player2.receivePos(payload)
    }

    toString() {
        let a = this.isBotMode ? "B" : "P"
        return `${a} Classic Room ${this.roomId}`
    }
}