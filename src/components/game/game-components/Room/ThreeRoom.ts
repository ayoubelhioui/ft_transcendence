import { Room } from "./Room";
import { Socket } from 'socket.io';
import { Game as ThreeGame } from '../PingPongGames/3dGame/Game'
import { PlayerScores } from "../../dto/player-scores.dto";
import { GameService } from "../../game.service";

export class ThreeRoom extends Room {

    game : ThreeGame

    constructor(isBot : boolean, gameService : GameService) {
        super(isBot, gameService)
        this.type = 1
    }

    start() {
        this.game = new ThreeGame(this, this.isBotMode)
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
        //data.position
        //data.velocity
        //data.init
        //data.spotPos
        //data.net
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
            spotPos : undefined
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

    
    sendRacketMove(payload : any, socketId : string) {
        if (this.closed === false) {
            return
        }
        if (this.isBotMode)
            return
        let player2 = this.getPlayer2Id(socketId)
        if (socketId === this.player1.socket.id)
            this.game.racketP1.set(-payload.position.x, payload.position.y, -payload.position.z)
        if (socketId === this.player2.socket.id)
            this.game.racketP2.set(payload.position.x, payload.position.y, payload.position.z)
        player2.emit("moveRacket", payload)
    }
    
    sendBotRacketInfo(payload : any) {
        if (this.closed === false)
            return
        console.log(`Send to ${this.player1.socket}`)
        this.player1.socket.emit("moveRacket", payload)
    }

    async sendGameScore(payload : PlayerScores) {
        if (this.closed === false)
            return
        let p = {
            score: [payload.player1Score, payload.player2Score]
        }
        let player2Data = {
            score : p.score.reverse()
        }
        this.broadCast("gameScore", p, player2Data)
        const res = await this.gameScoreTrigger(payload)
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

    receiveHitBall(payload : any, socketId : string) {
        let playerType = (this.player1.socket.id === socketId ? -1 : 1)
        payload.playerType = playerType
        this.game.ballObj.socketReceiveHit(payload)
    }

    toString() {
        let a = this.isBotMode ? "Bot" : "Ply"
        return `${a} Three Room ${this.roomId}`
    }

}