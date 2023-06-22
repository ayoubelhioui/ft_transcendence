

module.exports = class Bot {
    constructor(game) {
        this.game = game
        this.ball = game.ballObj
        this.posY = 0
    }




    update() {
        this.posY = this.ball.position.y
    }
}