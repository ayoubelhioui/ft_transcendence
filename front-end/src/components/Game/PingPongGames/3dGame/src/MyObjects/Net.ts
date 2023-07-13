import * as THREE from 'three'
import { params } from '../Utils/Params'
import { Game } from './Game'
import { MyScene } from './MyScene'

export class Net extends THREE.Object3D {

    game : Game
    scene : MyScene

    counter = 0

    netPlaneObj : THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
    

    constructor(game : Game) {
        super()

        this.game = game
        this.scene = game.scene


        this.netPlaneObj = this.getObject()
        this.add(this.netPlaneObj)
        this.scene.add(this)
    }

    getObject() {
        const planeGeo = new THREE.PlaneGeometry(params.netDim.x, params.netDim.y)
        const planeMat = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            wireframe: false, 
            blending: THREE.AdditiveBlending,
            opacity: 0
        })
        const netPlaneObj = new THREE.Mesh(planeGeo, planeMat)
        netPlaneObj.position.set(0, 0.75, 0)
        netPlaneObj.rotation.y = 0.5 * Math.PI

        return (netPlaneObj)
    }


    hit() {
        this.counter = 1
    }

    update() {
        //let pos = this.game.guiParams.getVal("scale", {x:0, y: 1, z: 1}, 0, 10, 0.01)
        if (this.counter === 1) {
            this.netPlaneObj.material.opacity += 0.01
            if (this.netPlaneObj.material.opacity > 0.2){
                this.netPlaneObj.material.opacity = 0.2
                this.counter++
            }
        } else if (this.counter === 2) {
            this.netPlaneObj.material.opacity -= 0.01
            if (this.netPlaneObj.material.opacity < 0) {
                this.netPlaneObj.material.opacity = 0
                this.counter++
            }
        } else {
            this.counter = 0
        }
    }
}