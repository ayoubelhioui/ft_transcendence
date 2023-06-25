import * as THREE from "three";
import { params } from '../Utils/Params'
import { Game } from "./Game";
import { MyScene } from "./MyScene";

export class AmbientLight extends THREE.AmbientLight {

    game : Game
    scene : MyScene

    constructor(game : Game) {
        super(0xcccccc, params.ambientLightIntensity)

        this.game = game
        this.scene = game.scene

        this.scene.add(this)
    }


}
