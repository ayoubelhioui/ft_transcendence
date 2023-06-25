import * as THREE from 'three'
import { params } from '../Utils/Params'
import { Game } from './Game'
import { MyScene } from './MyScene'
import { MyCamera } from './MyCamera'
import { Ball } from './Ball'

export class Racket extends THREE.Object3D {

    game : Game
    scene : MyScene
    camera : MyCamera
    ballObj : Ball
    rayMouseCamera : THREE.Raycaster
    racketPlaneObj : THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
    racketModel : any
    racketParent : any

    planeX : number = 0
    planeY : number = 0
    vecPlaneX : number = 0.5
    vecPlaneY : number = 0.5

    clickInfo = {
        startX: -1,
        startY: -1,
        startTime: 0,
        counter: 0,
        dx: 0,
        dy: 0,
        dt: 0,
        canPerform: true,
        time : 0
    }

    point1Obj : THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>
    point2Obj : THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>

    constructor(game : Game) {
        super()

        this.game = game
        this.scene = game.scene
        this.camera = game.camera
        this.ballObj = game.scene.ballObj
        this.rayMouseCamera = new THREE.Raycaster()


        const objs =  this.getObjects()
        this.racketPlaneObj = objs.racketPlaneObj
        game.scene.add(this.racketPlaneObj)

        this.racketModel = objs.racketModel
        this.racketParent = objs.racketParent
        this.add(this.racketParent)
        game.scene.add(this)

        const points = this.init()
        this.point1Obj = points.point1Obj
        this.point2Obj = points.point2Obj
        this.scene.add(this.point1Obj)
        this.scene.add(this.point2Obj)
    }

    getObjects() {
       return {
            ...this.getRacketPlaneObj(),
            ...this.getRacketObj()
       }
    }

    getRacketPlaneObj() {
        const racketPlaneGeometry = new THREE.PlaneGeometry(100, 100)
        const racketPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide,
            wireframe: true
        })
        const racketPlaneObj = new THREE.Mesh(racketPlaneGeometry, racketPlaneMaterial)
        racketPlaneObj.rotation.x = 0.5 * Math.PI
        racketPlaneObj.position.y = params.racketHeight
        racketPlaneObj.visible = false
        return {
            racketPlaneObj
        }
    }

    getRacketObj() {
        const racketModel = this.scene.racketModel
        //racketModel.scale.set(0.9, 0.9, 0.9)
        //racketModel.rotation.set(Math.PI, 0, Math.PI / 2)
        //racketModel.position.y = 0
        
        const racketParent = new THREE.Group()
        racketParent.add(racketModel)

     
        
        this.position.set(0, 2.5, 0)
        return {
            racketModel,
            racketParent
        }
    }

    racketPhy() {
        //Get mouse intersection with the plane coordinate
        
        const mousePosition = new THREE.Vector2(params.mouse.x, params.mouse.y)
        this.rayMouseCamera.setFromCamera(mousePosition, this.camera)
        const intersects = this.rayMouseCamera.intersectObject(this.racketPlaneObj)

        //If there is an intersection
        if (intersects.length) {
            // translating the plan so that p1 becomes the origin.
            const p = {
                x: intersects[0].point.x - params.player.p1.x,
                y: intersects[0].point.z - params.player.p1.y
            }
            
            //getCoefficient a, b of vec1 and vec2 of the plane
            const invMatrix = params.player.invMatrix
            const a = p.x * invMatrix.a + p.y * invMatrix.c
            const b = p.x * invMatrix.b + p.y * invMatrix.d
            
            //info
            this.planeX = intersects[0].point.x
            this.planeY = intersects[0].point.z
            this.vecPlaneX = a
            this.vecPlaneY = b

            //move the racket my the position of the mouse
           
            this.position.z = intersects[0].point.z
            this.position.x = intersects[0].point.x

            

            //limit the racket in the plane
            if (b < 0)
                this.position.z = params.player.p1.y
            else if (b > 1)
                this.position.z = params.player.p2.y
        
            if (a < 0)
                this.position.x = params.player.p1.x
            else if (a > 1)
                this.position.x = params.player.p3.x
            
            this.game.socketMgr.racketMove({
                position: this.position
            })
            //racket rotation
            const newAngle = - Math.PI * 1.5 * (b * 2 - 1)
            if (newAngle > - Math.PI / 2 && newAngle < Math.PI / 2){
                this.racketParent.rotation.x = newAngle
            }
        }
    }

    init() {
        const point1Geometry = new THREE.CircleGeometry(0.125, 10)
        const point1Material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            side: THREE.DoubleSide,
            wireframe: false
        })
        const point1Obj = new THREE.Mesh(point1Geometry, point1Material)
        point1Obj.rotation.y = 0.5 * Math.PI

        const point2Geometry = new THREE.CircleGeometry(0.125, 10)
        const point2Material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            side: THREE.DoubleSide,
            wireframe: false
        })
        const point2Obj = new THREE.Mesh(point2Geometry, point2Material)
        point2Obj.rotation.y = 0.5 * Math.PI

        point1Obj.position.set(0, 0.3, 0)
        point2Obj.position.set(5, 0.3, 0)
        
        point1Obj.visible = false
        point2Obj.visible = false

        return {
            point1Obj,
            point2Obj
        }
    }

    racketDir() {
        if (params.mouse.isClicked && !this.point1Obj.visible) {
            this.point1Obj.position.set(this.planeX, 0.3, this.planeY)
            this.point1Obj.visible = true
            this.clickInfo.startX = this.planeX
            this.clickInfo.startY = this.planeY
            this.clickInfo.time = performance.now()
            this.clickInfo.dt = performance.now()
            this.clickInfo.dx = this.planeX
            this.clickInfo.dt = this.planeY
        } else if (params.mouse.isClicked && this.point1Obj.visible) {
            let diffDt = performance.now() - this.clickInfo.dt
            let flag = true
            if (diffDt > 50) {
                this.clickInfo.dt = performance.now()
                this.clickInfo.dx = this.planeX - this.clickInfo.dx
                this.clickInfo.dy = this.planeY - this.clickInfo.dy
                let dDist = Math.sqrt(this.clickInfo.dx ** 2 + this.clickInfo.dy ** 2)
                if (dDist < 0.2) {
                    this.point1Obj.visible = false
                    this.point2Obj.visible = false
                    flag = false
                }
                this.clickInfo.dx = this.planeX
                this.clickInfo.dy = this.planeY
            }
            if (flag) {
                this.point2Obj.visible = true
                this.point2Obj.position.set(this.planeX, 0.3, this.planeY)

                let distX = this.planeX - this.clickInfo.startX
                let distY = this.planeY - this.clickInfo.startY
                let dist = Math.sqrt(distX ** 2 + distY ** 2)
                let maxDist = 5
                if (dist > maxDist) {
                    let a = distX * (maxDist / dist)
                    let b = distY * (maxDist / dist)
                    a = this.planeX - a
                    b = this.planeY - b
                    this.point1Obj.position.set(a, 0.3, b)
                    this.clickInfo.startX = a
                    this.clickInfo.startY = b
                }
            }
        } else if (!params.mouse.isClicked) {
            this.point1Obj.visible = false
            this.point2Obj.visible = false
        }
    }

    isInRange() {
        let xRange = 4
        let zRange = 2
        let xDist = this.position.x - this.ballObj.position.x
        let zDist = this.position.z - this.ballObj.position.z
        let value = false
        if (params.mouse.isClicked && Math.abs(xDist) < xRange && Math.abs(zDist) < zRange && xDist >= -0.1)
            value = true
        return {
            value,
            xDist,
            zDist
        }  
    }

    moveRacket(newPos : number, speed : number) {
        // move racket when the ball is close
        // let newPos = 2.5
        // let speed = 0.05
        /*if (Math.abs(dist) < 4 && this.ballObj.velocity.x > 0) {
            newPos = this.ballObj.position.y - 2.5
            speed = 0.2
        }*/
        if (this.position.y !== newPos) {
            let step = Math.sign(newPos - this.position.y) * speed
            if (Math.abs(this.position.y - newPos) < Math.abs(step))
                this.position.y = newPos
            else
                this.position.y +=step
        }
    }
     
    //=============================================
    //=============================================

    performHit(obj : Racket) {
        params.mouse.isClicked = false
        obj.clickInfo.canPerform = true
        let distX = (obj.planeX - obj.clickInfo.startX) / 5
        let distY = (obj.planeY - obj.clickInfo.startY) / 5
        //distX = Math.abs(distX)
        distX = distX * distX * distX
        distY = Math.sqrt(Math.abs(distY)) * Math.sign(distY)
        let data = {
            distX, distY
        }
        obj.game.socketMgr.hitBall(data)
    }

    hit() {
        let rangeInfo = this.isInRange()
        if (rangeInfo.value && rangeInfo.xDist > 0) {
            if (this.clickInfo.canPerform) {
                this.clickInfo.canPerform = false
                setTimeout(this.performHit, 100, this)
            } else {
                this.moveRacket(this.position.y, 0.2)
            }
        }
    }

    update() {
        this.racketPhy()
        this.racketDir()
        this.moveRacket(2.5, 0.05)
        this.hit()
    }
}