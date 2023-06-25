import { Game } from "./Game"
import { Paddle } from "./Paddle"
import { params } from "./Params"

export class Player2 extends Paddle {
    constructor(game : Game) {
        super(game)

        this.position.set(params.sceneDim.x / 2 - params.paddleDim.x / 2, 0)
        this.setPos(this.position)
    }

    update() {
        this.sendPos(2)
        this.resetAddedSpeed()
    }
}
