import { Game } from "./Game"
import { params } from "./Params"
import * as THREE from 'three'
import { Vec2 } from "./interfaces/vec2.interface"

export class Paddle {
    
    game : Game

    speed : number = 4
    addedSpeed : number = 0
    maxAdd : number = 12
    dir : number = 0
    timeStep : number = params.timeStep
    position : THREE.Vector2 = new THREE.Vector2(0, 0)
    oldY : number = 0
    counter : number = 0
    cx : number = 0
    x1 : number = 0
    x2 : number = 0
    cy : number = 0
    y1 : number = 0
    y2 : number = 0

    constructor(game : Game) {
        this.game = game
    }

    isIn(pos : Vec2) {
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

    
    setPos(pos : Vec2, e : number = 0)
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


    botSetPos(posY : number) {
        let newPos = {
            x: this.position.x,
            y: posY
        }
        this.position.y = posY
        this.setPos(newPos)
    }

    sendPos(id : number) {
        this.game.room.sendPaddleMove({id : id, y: this.position.y})
    }

    receivePos(payload : any) {
        this.setPos(this.position, payload.e)
    } 
}