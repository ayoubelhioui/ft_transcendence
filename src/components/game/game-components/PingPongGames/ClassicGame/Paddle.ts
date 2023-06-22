const params = require("./Params")
const THREE = require("three")

module.exports = class Paddle {
    constructor(game) {
        this.game = game
        this.speed = 4
        this.addedSpeed = 0
        this.maxAdd = 12
        this.dir = 0
        this.timeStep = params.timeStep
        this.position = new THREE.Vector3(0, 0)
        this.oldY = 0
        this.counter = 0
    }


    isIn(pos) {
        if (pos.y <= this.y1 && pos.y >= this.y2)
            return (true)
        return (false)
    }

    resetAddedSpeed() {
        let maxIter = 4
        if (Math.abs(this.position.y - this.oldY) < 0.2 && this.counter < maxIter) {
            this.counter++
        }
        this.oldY = this.position.y
        if (this.counter >= maxIter)
            this.addedSpeed = 0
    }

    #addSpeed() {
        if (this.addedSpeed < this.maxAdd)
            this.addedSpeed += 0.5
        else
            this.addedSpeed = this.maxAdd
        this.counter = 0
    }

    setPos(pos, e = 0)
    {
        this.#addSpeed()
        this.position.y += (this.speed + this.addedSpeed) * this.timeStep * e
        this.cx = pos.x
        this.x1 = pos.x - params.paddleDim.x / 2
        this.x2 = pos.x + params.paddleDim.x / 2

        const cy = pos.y
        const y1 = pos.y + params.paddleDim.y / 2
        const y2 = pos.y - params.paddleDim.y / 2

        if (y1 < params.sceneDim.y * 0.5 && y2 > params.sceneDim.y * -0.5) {
            this.cy = cy
            this.y1 = y1
            this.y2 = y2
        } else if (y1 >= params.sceneDim.y * 0.5) {
            this.position.y = params.sceneDim.y * 0.5 - params.paddleDim.y * 0.5
        } else {
            this.position.y = params.sceneDim.y * -0.5 + params.paddleDim.y * 0.5
        }
    }

    sendPos(id) {
        this.game.room.sendPaddleMove({id : id, y: this.position.y})
    }

    receivePos(data) {
        this.setPos(this.position, data.e)
    } 
}