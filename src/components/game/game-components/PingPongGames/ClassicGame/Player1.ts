const params = require('./Params')
const Paddle = require('./Paddle')

module.exports = class Player1 extends Paddle {
    constructor(game) {
        super(game)

        this.position.set(-params.sceneDim.x / 2 + params.paddleDim.x / 2, 0, 0)
        this.setPos(this.position)
    }


    update() {
        this.sendPos(1)
        this.resetAddedSpeed()
    }
}
