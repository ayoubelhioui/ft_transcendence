import { ClassicRoom } from '../../Room/ClassicRoom'
import { Ball } from './Ball'
import { Bot } from './Bot'
import { params } from './Params'
import { Player1 } from './Player1'
import { Player2 } from './Player2'

export class Game {

    room : ClassicRoom
    botObj : Bot | undefined = undefined
    ballObj : Ball
    player1 : Player1
    player2 : Player2
    interval : NodeJS.Timer
    
    totalTime : number = 0
    gameInfo = {
        turn: 0, //the player that will shot the ball
        initTurn: 0,
        scorePlayer1: 0,
        scorePlayer2: 0,
        start: false,
        isBot: false
    }

    constructor(room : ClassicRoom, botMode : boolean) {
        this.room = room
        this.player1 = new Player1(this)
        this.player2 = new Player2(this)
        this.ballObj = new Ball(this)
        if (botMode)
            this.botObj = new Bot(this)
    }

    start(payload : any) {
        console.log("Game is started ...")
        this.gameInfo.turn = payload.turn
        this.gameInfo.initTurn = payload.turn
        this.gameInfo.start = true
    }

    async changeScore(p : number[]) {
        this.gameInfo.scorePlayer1 += p[0]
        this.gameInfo.scorePlayer2 += p[1]
        console.log(" Score1: ", this.gameInfo.scorePlayer1, " Score2: ", this.gameInfo.scorePlayer2)
        this.changeTurn(this.getTurnInit())
        await this.room.sendGameScore({
            player1Score : this.gameInfo.scorePlayer1,
            player2Score : this.gameInfo.scorePlayer2
        })
    }

    getTurnInit() {
        let b = (this.gameInfo.scorePlayer1 + this.gameInfo.scorePlayer2) / 2
        let a = (this.gameInfo.initTurn) + Math.floor(b)
        return (a % 2)
    }

    getTurn() {
        return this.gameInfo.turn
    }

    changeTurn(to = undefined) {
        this.gameInfo.turn = to ?? (this.gameInfo.turn + 1) % 2
        this.room.sendTurn({
            turn: this.gameInfo.turn
        })
    }

    async update() {
        let t = performance.now()
        await this.ballObj.update()
        this.player1.update()
        this.player2.update()
        this?.botObj?.update()
        params.frame++
        t = performance.now() - t
        this.totalTime += t 
        //console.log(t, this.totalTime / params.frame)
    }

    gameLoop() {
        this.interval = setInterval((game) => game.update(), 1000 / 60, this)
    }

    stop() {
        clearInterval(this.interval)
    }

    
}