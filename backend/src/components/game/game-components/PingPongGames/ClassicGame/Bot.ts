import { customLog } from "src/Const"
import { Ball } from "./Ball"
import { Game } from "./Game"
import { params } from "./Params"


export class Bot {

    game : Game
    ball : Ball
    position : THREE.Vector2
    speed : number = 10
    mode : number = 0.95
    target : number | undefined
    ballDir = {x : 0, y : 0}

    constructor(game : Game) {
        this.game = game
        this.ball = game.ballObj
        this.position = game.player2.position.clone()
        this.target = undefined
        this.ballDir.x = Math.sign(this.ball.velocity.x)
        this.ballDir.y = Math.sign(this.ball.velocity.y)
    }


    goTo(posY : number) {
        const diffY = (posY - this.position.y) * 0.5
        this.position.y += diffY * params.timeStep * this.speed
        //this.position.y = posY
    }

    move() {
        let distX = this.ball.position.x - this.position.x
        const sameDir = (Math.sign(distX) !== Math.sign(this.ball.velocity.x))

        if (this.ballDir.x !== Math.sign(this.ball.velocity.x) 
        || this.ballDir.y !== Math.sign(this.ball.velocity.y)) {
            this.ballDir.x = Math.sign(this.ball.velocity.x)
            this.ballDir.y = Math.sign(this.ball.velocity.y)
            this.target = undefined
            //customLog("change target")
        }

        if (Math.abs(distX) < params.sceneDim.x / 2 - 1 && sameDir) {
            let ballSpeed = {
                x : this.ball.velocity.x * this.ball.speed,
                y : this.ball.velocity.y * this.ball.speed
            }
            const time = (this.ball.position.x - this.position.x ) / (ballSpeed.x)
            if (this.target === undefined) {
                this.target = (ballSpeed.y) * Math.abs(time) + this.ball.position.y
                let rr = Math.random()
                //customLog(this.target)
                if (rr > this.mode) {
                    //customLog("lose", rr)
                    const r = (Math.random() * 2 - 1)
                    this.target += r * 3 + 0.05 * (Math.sign(r))
                }
            }
            //this.gotTo(this.ball.position.y)
            this.goTo(this.target)
        }
    }

    update() {
        this.move()
        this.game.player2.botSetPos(this.position.y)
    }
}