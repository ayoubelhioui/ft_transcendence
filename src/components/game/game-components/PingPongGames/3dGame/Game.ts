import { params } from './Params'
import * as THREE from 'three'
import { Bot } from './Bot'
import { Ball } from './Ball'
import { Room } from '../../Room/Room'
import { ThreeRoom } from '../../Room/ThreeRoom'

export class Game {

    room : ThreeRoom | undefined = undefined
    botObj : Bot | undefined = undefined
    ballObj : Ball | undefined = undefined
    racketP1 : THREE.Vector3 | undefined = undefined
    racketP2 : THREE.Vector3 | undefined = undefined
    gameInfo = {
        turn: 0, //the player that will shot the ball
        initTurn: 0,
        scorePlayer1: 0,
        scorePlayer2: 0,
        start: false,
        end : false,
        isBot: false
    }
    interval : NodeJS.Timer

    constructor(room : ThreeRoom, botMode : Boolean) {
        this.room = room
        this.racketP1 = new THREE.Vector3()
        this.racketP2 = new THREE.Vector3()
        this.ballObj = new Ball(this)
        if (botMode)
            this.botObj = new Bot(this)
       
    }

    start(payload : any) {
        console.log("Game is started ...")
        if (this.gameInfo.isBot)
            return
        this.gameInfo.turn = payload.turn
        this.gameInfo.initTurn = payload.turn
        this.gameInfo.start = true
    }

    async changeScore(p : number[]) {
        this.gameInfo.scorePlayer1 += p[0]
        this.gameInfo.scorePlayer2 += p[1]
        let s = (p[2] === 0 ? "Player1 " : "Player2 ")
        console.log(p[3], s, " Score1: ", this.gameInfo.scorePlayer1, " Score2: ", this.gameInfo.scorePlayer2)
        this.changeTurn(this.getTurnInit())
        await this.room.sendGameScore({
            player1Score : this.gameInfo.scorePlayer1,
            player2Score: this.gameInfo.scorePlayer2
        })
    }

    getTurnInit() {
        let a = (this.gameInfo.scorePlayer1 + this.gameInfo.scorePlayer2) / 2
        let b = (this.gameInfo.initTurn) + Math.floor(a)
        return (b % 2)
    }

    getTurn() {
        return this.gameInfo.turn
    }

    changeTurn(to : number | undefined = undefined) {
        // console.trace(`=>${to} myFunction called from:`);
        if (to === undefined) {
            this.gameInfo.turn = (this.gameInfo.turn + 1) % 2
        } else {
            this.gameInfo.turn = to
        }
        this.room.sendTurn({
            turn: this.gameInfo.turn
        })
    }


    async update() {
        if (this.gameInfo.end === true) {
            this.ballObj.end()
            clearInterval(this.interval)
        } else {
            await this.ballObj.update()
            this?.botObj?.update()
            this.room.broadcastToWatchers()
            params.frame++
        }
    }

    gameLoop() {
        this.interval = setInterval((game) => game.update(), 1000 / 60, this)
    }

    stop() {
        this.gameInfo.end = true
    }
}
    