import * as THREE from "three";
import { params } from '../Utils/Params'
import { Game } from "./Game";
import { MyScene } from "./MyScene";

class CircleItem extends THREE.Mesh<THREE.CircleGeometry, THREE.MeshStandardMaterial> {

    dim : number = params.ballDim
    time : number = 0


    constructor() {
        super()
        
        let material = new THREE.MeshStandardMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide,
            emissive: 0x0000ff,
            emissiveIntensity: 4
        })
        let geometry = new THREE.CircleGeometry(this.dim)
        
        this.material = material
        this.geometry = geometry
    }
}

export class TrailRenderer {

    game : Game
    scene : MyScene
    obj : any
    arr : CircleItem[] = []
    stack : CircleItem[] = []
    lastPoint : THREE.Vector3

    
    timeToDisappear : number = 300
    maxDisplacement : number = 3
    color1 = { r: 0, g: 0, b: 255 };   // Blue
    color2  = { r: 255, g: 0, b: 0 };   // Red
    stop : boolean = false

    constructor(game : Game, obj : any) {
        this.game = game
        this.scene = game.scene
        this.obj = obj
        this.arr = []
        this.stack = []
        this.lastPoint = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z)
    }


    interpolateColors(ratio : number) {
        let r = Math.round((1 - ratio) * this.color1.r + ratio * this.color2.r);
        let g = Math.round((1 - ratio) * this.color1.g + ratio * this.color2.g);
        let b = Math.round((1 - ratio) * this.color1.b + ratio * this.color2.b);
      
        return (r << 16 | g << 8 | b);
    }


    setItem(pos : THREE.Vector3) {
        let newItem = undefined
        if (this.stack.length) {
            newItem = this.stack[this.stack.length - 1]
            this.stack.pop()
        } else {
            newItem = new CircleItem()
            newItem.time = 0
            this.arr.push(newItem)
            this.scene.add(newItem)
        }
        newItem.position.x = pos.x
        newItem.position.y = pos.y
        newItem.position.z = pos.z
        newItem.scale.x = 1
        newItem.scale.y = 1
        newItem.visible = true
        newItem.time = performance.now()
        let direction = newItem.position.clone().add(this.obj.velocity)
        newItem.lookAt(direction)
        return (newItem)
    }

    dist3D(a : THREE.Vector3, b : THREE.Vector3) {
        let arr = [
            (a.x - b.x),
            (a.y - b.y),
            (a.z - b.z),
        ]
        return arr.map((item) => item ** 2).reduce((res, b) => res + b)
    }

    update() {
        

        if (!this.stop) {
            let newPoint = new THREE.Vector3(this.obj.position.x, this.obj.position.y, this.obj.position.z)
            let intermediatePoint = new THREE.Vector3()
            if (this.dist3D(newPoint, this.lastPoint) > this.maxDisplacement) {
                this.lastPoint = newPoint
                return 
            }
            for (let i = 1; i < 20; i++) {
                let ratio = i / 19
                intermediatePoint.lerpVectors(this.lastPoint, newPoint, ratio);
                this.setItem(intermediatePoint)
            }
            // console.log(this.stack.length)
            this.lastPoint = newPoint
        }


        for (let i = this.arr.length - 1; i >= 0; i--) {
            let item = this.arr[i]
            let currentTime = performance.now()
            let diff = currentTime - item.time
            if (diff <= this.timeToDisappear) {
                item.scale.x -= 0.04
                item.scale.y -= 0.04
                if (item.scale.x < 0)
                    item.scale.x = 0
                if (item.scale.y < 0)
                    item.scale.y = 0
                const newColor = this.interpolateColors(item.scale.x)
                item.material.color.set(newColor)
                item.material.emissive.set(newColor)
            } else if (item.visible) {
                item.visible = false
                this.stack.push(item)
            }
            
        }
    }
}