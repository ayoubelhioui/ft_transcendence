import * as THREE from "three";
import { params } from '../Utils/Params'
import { Game } from "./Game";
import { MyScene } from "./MyScene";

export class SpotLight extends THREE.SpotLight {

    game : Game
    scene : MyScene

    constructor(game : Game) {
        super(0xffffff)

        this.game = game
        this.scene = game.scene





        this.position.set(3, 15, 0)
        this.penumbra = params.penumbra
        this.angle = params.angle
        this.intensity = params.intensity
        this.castShadow = true

        this.scene.add(this)
    }


    

}