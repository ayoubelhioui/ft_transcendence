const THREE = require('three')
const params = require('./Params')

module.exports = class Ball {
    constructor(game) {
        this.game = game
        this.timeStep = params.timeStep
        this.ballDim = params.ballDim

        this.position = new THREE.Vector2()
        this.velocity = new THREE.Vector2()
        this.speed = 6
        this.maxSpeed = 12

        this.info = {
            lose : false,
            init: true,
            turn : 0
        }

        this.init(this)
    }

    //=================================

    reset() {
        if (Math.abs(this.position.x) > params.sceneDim.x / 2) {
            if (this.position.x < 0)
                this.game.changeScore([0, 1])
            else if (this.position.x > 0)
                this.game.changeScore([1, 0])
            
            this.init(this)
        }
    }

    init(ball) {
        function perform() {
            // let rx = Math.random() * ((ball.info.turn % 2) * 2 - 1) * 0.5
            // let ry = (Math.random() * 2 - 1) * 0.5
            // if (Math.abs(rx) < 0.2)
            //     rx = 0.2 * Math.sign(rx)
            // if (Math.abs(ry) < 0.2)
            //     ry = 0.2 * Math.sign(ry)
            ball.info.turn++
            ball.velocity.set(-1 * ((ball.info.turn % 2) * 2 - 1), 0, 0)
            ball.velocity.normalize()
            ball.info.lose = false
        }
        ball.position.set(0, 0, 0)
        ball.info.lose = true
        setTimeout(perform, 1000)
    }

    newYVector() {
        let cy = this.game.player2.cy
        if (this.position.x < 0)
            cy = this.game.player1.cy
        let distY = -2 * (cy - this.position.y) / params.paddleDim.y
        if (Math.abs(distY) > 0.8)
            distY = 0.8 * Math.sign(distY)
        let v = new THREE.Vector2(Math.sqrt(1 - distY * distY), distY)
        this.velocity.x = v.x * Math.sign(this.velocity.x)
        this.velocity.y = v.y
    }

    move() {
        let nextX = this.position.x + this.velocity.x * this.timeStep * this.speed
        let nextY = this.position.y + this.velocity.y * this.timeStep * this.speed
        let rfx = 1
        let rfy = 1

        let y1 = params.sceneDim.y * 0.5 - params.ballDim
        let y2 = params.sceneDim.y * -0.5 + params.ballDim
        if (this.velocity.y > 0 && nextY >= y1) {
            rfy = -1
            nextY = y1
        } else if (this.velocity.y < 0 && nextY <= y2) {
            rfy = -1
            nextY = y2
        }
        
        
        let x = undefined
        if (this.velocity.x < 0 && this.game.player1.isIn({x: nextX, y: nextY}))
            x = params.sceneDim.x * -0.5 + params.ballDim + params.paddleDim.x
        else if (this.velocity.x > 0 && this.game.player2.isIn({x: nextX, y: nextY}))
            x = params.sceneDim.x * 0.5 - params.ballDim - params.paddleDim.x
        if (x && Math.sign(nextX - x) === Math.sign(this.velocity.x)) {
            this.newYVector()
            rfx = -1
            nextX = x
        }

        this.velocity.x *= rfx
        this.velocity.y *= rfy
        this.position.x = nextX
        this.position.y = nextY
    }

    #socketSendBallInfo() {
        // if (params.frame % 3 !== 0)
        //     return
        let data = {
            position: this.position,
            velocity: this.velocity,
            speed: this.speed
        }
        this.game.room.sendBallInfoClassic(data)
    }

    addSpeed() {
        this.speed += (params.frame * params.timeStep) / 1200
        console.log(this.speed)
        if (this.speed > this.maxSpeed)
            this.speed = this.maxSpeed
    }

    update() {
        if (this.info.lose === false) {
            this.move()
            this.reset()
            this.addSpeed()
        }
        this.#socketSendBallInfo()
    }
}



//ball collision
//sep classic and 3d server code

