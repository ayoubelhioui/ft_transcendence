const params = require('./Params')
const THREE = require('three')
const Ball = require('./Ball')
const Bot = require('./Bot')

module.exports = class Game {
    constructor() {


        this.room = undefined
        this.botObj = undefined
        this.ballObj = undefined
        this.racketP1 = undefined
        this.racketP2 = undefined
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
        this.racketP1 = new THREE.Vector3()
        this.racketP2 = new THREE.Vector3()
        this.ballObj = new Ball(this)
        if (botMode)
            this.botObj = new Bot(this)
        // if (game.gameInfo.isBot) {
        //     this.player2 = new Bot(game)
        // } else {
        //     this.player2 = new Human(game)
        // }
    } 


    start(data) {
        console.log("Game is started ...")
        if (this.gameInfo.isBot)
            return
        this.gameInfo.turn = data.turn
        this.gameInfo.initTurn = data.turn
        this.gameInfo.start = true
    }

    changeScore(p) {
        this.gameInfo.scorePlayer1 += p[0]
        this.gameInfo.scorePlayer2 += p[1]
        let s = (p[2] === 0 ? "Player1 " : "Player2 ")
        console.log(p[3], s, " Score1: ", this.gameInfo.scorePlayer1, " Score2: ", this.gameInfo.scorePlayer2)
        this.changeTurn(this.getTurnInit())
        this.room.sendGameScore({
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


    update() {
        // if (!this.gameInfo.start)
        //     return
        this.ballObj.update()
        this?.botObj?.update()
        params.frame++
    }

    gameLoop() {
        this.interval = setInterval((game) => game.update(), 1000 / 60, this)
    }

    stop() {
        clearInterval(this.interval)
    }
}
    