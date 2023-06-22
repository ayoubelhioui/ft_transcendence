const Ball = require('./Ball')
const Bot = require('./Bot')
const params = require('./Params')
const Player1 = require('./Player1')
const Player2 = require('./Player2')

export class Game {
    constructor() {
        this.room = undefined
        this.botObj = undefined
        this.ballObj = undefined
        this.paddleP1 = undefined
        this.paddleP2 = undefined

        this.totalTime = 0
        this.gameInfo = {
            turn: 0, //the player that will shot the ball
            initTurn: 0,
            scorePlayer1: 0,
            scorePlayer2: 0,
            start: false,
            isBot: false
        }

    }

    init(room, botMode = false) {
        this.room = room
        this.player1 = new Player1(this)
        this.player2 = new Player2(this)
        this.ballObj = new Ball(this)
        if (botMode)
            this.botObj = new Bot(this)
    }

    start(data) {
        console.log("Game is started ...")
        this.gameInfo.turn = data.turn
        this.gameInfo.initTurn = data.turn
        this.gameInfo.start = true
    }

    changeScore(p) {
        this.gameInfo.scorePlayer1 += p[0]
        this.gameInfo.scorePlayer2 += p[1]
        console.log(" Score1: ", this.gameInfo.scorePlayer1, " Score2: ", this.gameInfo.scorePlayer2)
        this.changeTurn(this.getTurnInit())
        this.room.sendGameScoreClassic({
            score: [this.gameInfo.scorePlayer1, this.gameInfo.scorePlayer2]
        })
    }

    getTurnInit() {
        //0->player1 1->player2
        let a = (this.gameInfo.initTurn) + parseInt((this.gameInfo.scorePlayer1 + this.gameInfo.scorePlayer2) / 2)
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

    update() {
        let t = performance.now()
        this.ballObj.update()
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