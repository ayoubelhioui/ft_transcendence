import * as THREE from 'three'
import { params } from '../Utils/Params'
import { Game } from './Game'
import { MyScene } from './MyScene'
import { MyCamera } from './MyCamera'
import { Ball } from './Ball'

export class Player2 extends THREE.Object3D {
    
    game : Game
    scene : MyScene
    camera : MyCamera
    ballObj : Ball
    velocity : THREE.Vector3
    botTarget : THREE.Vector3

    timeStep : number = params.timeStep
    moveToInfo = {
        status : 0,
        lose : false
    }


    racketModel : any
    racketParent : THREE.Group


    socketData = undefined

    constructor (game : Game) {
        super()

        this.game = game
        this.scene = game.scene
        this.camera = game.camera
        this.ballObj = this.game.ballObj
        this.velocity = new THREE.Vector3()
        this.timeStep = params.timeStep
        this.botTarget = new THREE.Vector3(0, 0, 0)
        this.moveToInfo = {
            status : 0,
            lose : false
        }
        const racket =  this.getObject()
        this.racketModel = racket.racketModel
        this.racketParent = racket.racketParent
        this.add(this.racketParent)
        this.scene.add(this)

        this.socketData = undefined
    }

    getObject() {
        const racketModel = this.game.racketModel.clone()
        //racketModel.scale.set(0.15, 0.15, 0.3)
        racketModel.rotation.y = Math.PI

        const racketParent = new THREE.Group()
        racketParent.add(racketModel)

        //racketModel.position.y = -1.5
        racketParent.position.set(0, 2.5, 0)

       
        this.position.set(-18, 0, 0)
        return {
            racketModel,
            racketParent
        }
        
    }

    rotateObj() {
        //racket rotation
        let b = (this.position.z / params.planeDim.y * 2 + 1) * 0.5
        const newAngle =  Math.PI * 1.5 * (b * 2 - 1)
        if (newAngle > - Math.PI / 2 && newAngle < Math.PI / 2){
            this.racketParent.rotation.x = newAngle
        }
    }

    socketMoveRacket(payload : any) {
        this.position.copy(payload.position)
        this.rotateObj()
    }

    update() {
        
    }
}