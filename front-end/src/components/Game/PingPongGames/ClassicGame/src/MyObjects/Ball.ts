import { params } from "../Utils/Params"
import * as THREE from 'three'
import { Game } from "./Game"
import { MyScene } from "./MyScene"
import { MyCamera } from "./MyCamera"
import { IBallInfo } from "../Interfaces/interface.ball.info"

export class Ball extends THREE.Object3D{
    
    game : Game
    scene : MyScene
    camera : MyCamera
    ballObj : THREE.Mesh
    trailObj : THREE.Mesh[]

    timeStep : number = params.timeStep
    ballDim : number = params.ballDim
    velocity : THREE.Vector3 = new THREE.Vector3(0, 0, 0)
    speed : number = 2


    constructor(game : Game) {
        super()
        this.game = game
        this.scene = game.scene
        this.camera = game.camera
        
        
        this.init()
     
        const objs = this.#getObjects()

        this.ballObj = objs.ballObj
        this.add(this.ballObj)

        this.trailObj = [this.createNewObj(this.position)]

        this.scene.add(this)
    }


    #getObjects() {
       return {
            ...this.#getBallObj()
       }
    }

    #getBallObj() {
        const sphereGeo = new THREE.CircleGeometry(params.ballDim);
        const sphereMat = new THREE.MeshBasicMaterial({ 
            color: 0xffffff
        });
        const sphereObj = new THREE.Mesh(sphereGeo, sphereMat);
        return {
            ballObj: sphereObj
        }
    }

    createNewObj(pos : THREE.Vector3) {
        const sphereGeo = new THREE.CircleGeometry(params.ballDim);
        const sphereMat = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            blending: THREE.MultiplyBlending,
            opacity: 0.5
        });
        const sphereObj = new THREE.Mesh(sphereGeo, sphereMat);
        sphereObj.position.set(pos.x, pos.y, 0)
        this.scene.add(sphereObj)
        return (sphereObj)
    }

   

    init() {
        this.position.set(0, 0, 0)
        this.velocity.set(-1, 0, 0)
    }

   

    move() {
        let nextX = this.position.x + this.velocity.x * this.timeStep * this.speed
        let nextY = this.position.y + this.velocity.y * this.timeStep * this.speed
        
        this.position.x = nextX
        this.position.y = nextY
    }


    socketGetBallInfo(payload : IBallInfo) {
        if (!this.game.isStarted())
            return
        const position = payload.position
        const velocity = payload.velocity
        this.trailObj[0].position.set(this.position.x, this.position.y, 0)
        this.position.set(position.x, position.y, 0)
        this.velocity.set(velocity.x, velocity.y, 0)
        this.speed = payload.speed
    }

    update() {
        if (this.game.isStarted()) {
            // this.move()
            // this.reset()
        }
    }
}