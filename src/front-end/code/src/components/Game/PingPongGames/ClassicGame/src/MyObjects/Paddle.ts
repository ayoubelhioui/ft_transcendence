import * as THREE from 'three'
import {params} from '../Utils/Params'
import { Game } from './Game'
import { MyScene } from './MyScene'

export class Paddle extends THREE.Object3D {

    game : Game
    scene : MyScene

    speed : number = 4
    addedSpeed : number = 0
    maxAdd : number = 12
    dir : number = 0
    timeStep : number = params.timeStep
    cx : number = 0
    x1 : number = 0
    x2 : number = 0
    cy : number = 0
    y1 : number = 0
    y2 : number = 0

    constructor(game : Game) {
        super()

        this.game = game
        this.scene = game.scene

        const objs = this.getRacketObj()
        this.add(objs)
        this.scene.add(this)
    }

    getRacketObj() {
        const geo = new THREE.PlaneGeometry(params.paddleDim.x, params.paddleDim.y - params.ballDim)
        const mat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        })
        const mesh = new THREE.Mesh(geo, mat)

        return (mesh)
    }


    setPosHelper(pos : THREE.Vector3) {
        this.cx = pos.x
        this.x1 = pos.x - params.paddleDim.x / 2
        this.x2 = pos.x + params.paddleDim.x / 2
        this.cy = pos.y
        this.y1 = pos.y + params.paddleDim.y / 2
        this.y2 = pos.y - params.paddleDim.y / 2
    }


    receivePos(payload : any) {
        this.position.y = payload.y
        this.setPosHelper(this.position)
    }


}
