import { customLog } from 'src/Const'
import { Ball } from './Ball'
import { Game } from './Game'
import { params } from './Params'
import * as THREE from 'three'

export class Bot {
    game : Game
    ballObj : Ball


    timeStep : number = params.timeStep
    gravityForce : number = params.gravityForce
    step : number = 0
    performInit : boolean = false
    moveToInfo = {
        status : 0,
        lose : false
    }

    
    velocity = new THREE.Vector3()
    position = new THREE.Vector3(-20, 0, 0)
    botTarget = new THREE.Vector3(0, 0, 0)
    target = new THREE.Vector3(0, 0, 0)
    limit = {
        x: {
            a : - params.planeDim.x * 0.8,
            b : - params.planeDim.x * 0.4
        },
        y : {
            a: - params.planeDim.y * 0.7,
            b: + params.planeDim.y * 0.7
        }
    }

    constructor (game : Game) {
        this.game = game
        this.ballObj = this.game.ballObj
    }


    determineMaxPossibleHeight() {
        let gv = this.ballObj.groundInfo.v
        let gp = this.ballObj.groundInfo.p
        
        let xMax = ((gv.y * gv.x) / this.gravityForce + gp.x)
        let zMax = ((gv.y * gv.z) / this.gravityForce + gp.z) 
        xMax = Math.min(Math.abs(xMax), Math.abs(this.limit.x.a)) * Math.sign(xMax)
        zMax = Math.min(Math.abs(zMax), Math.abs(this.limit.y.a)) * Math.sign(zMax)

        let tx = (xMax - gp.x) / gv.x
        let tz = (zMax - gp.z) / gv.z
        let zx = gv.z * tx + gp.z
        let xz = gv.x * tz + gp.x

        if (Math.abs(zx) <= Math.abs(zMax)) {
            let y = - 0.5 * this.gravityForce * (tx ** 2) + gv.y * tx + gp.y
            let res = new THREE.Vector3(xMax, y, zx)
            //customLog("z", res)
            return (res)
        } else {
            let y = - 0.5 * this.gravityForce * (tz ** 2) + gv.y * tz + gp.y
            let res = new THREE.Vector3(xz, y, zMax)
            //customLog("x", res)
            return (res)
        }
    }

    #socketSendPosition() {
        this.game.room.sendBotRacketInfo(
            {
            position: this.position
        })
    }

    moveTo(time : number) {
        if (this.moveToInfo.status === 1) {
            this.botTarget.y += -2
            this.velocity = new THREE.Vector3().copy(this.botTarget).sub(this.position).multiplyScalar(1 / time)
            this.moveToInfo.status++
        }
        if (this.moveToInfo.status === 2) {
            let d = this.velocity.clone().multiplyScalar(this.timeStep)
            let dist = this.botTarget.clone().sub(this.position)
            if (d.length() >= dist.length()) {
                this.position.add(dist)
            } else {
                this.position.add(d)
            }
        }
        this.#socketSendPosition()
    }


    
    hitTheBall() {
        let diff = new THREE.Vector3().copy(this.target).sub(this.ballObj.position)
        let dist = diff.length()
        if (dist < 0.6) {
            if (this.moveToInfo.lose === false) {
                const newPos = this.ballObj.randomPos()
                this.ballObj.botSetVelocity(newPos.x, newPos.y, newPos.speed)
            } else {
                setTimeout((obj) => {
                    obj.moveToInfo.lose = false
                }, 200, this)
            }
        }
        if (dist < 4) {
            this.moveTo(0.1)
        }
    }

    randomLose() {
        let r = Math.random()
        if (r > 1) {
            customLog("Lose")
            let z = (Math.random() * 2 - 1) * 2
            let y = (Math.random() * 2 - 1) * 2
            z += 1 * Math.sign(z)
            y += 1 * Math.sign(z)
            this.moveToInfo.lose = true
            return (new THREE.Vector3(0, y, z))
        }
        return (new THREE.Vector3(0, 0, 0))
    }

    ballInit() {
        if (this.performInit === true)
            return 
        
        //? reset the position of the bot
        this.position.set(-params.planeDim.x / 2 - 1, this.position.y, 0)
        this.#socketSendPosition()

        function perform(obj : Bot) {
            let r = (Math.random() * 2 - 1) * params.planeDim.y * 0.2
            obj.performInit = false
            obj.ballObj.directSetVelocity(12, 3, r)
        }

        this.performInit = true
        setTimeout(perform, 1200, this)
    }

    update() {
        if (this.ballObj.initialize && this.game.getTurnInit() === 1) {
            this.ballInit()
        }
        else if (this.ballObj.lose === false && this.game.getTurn() === 1){
            if (this.ballObj.groundInfo.v.x < 0 && this.step === 0 && this.ballObj.bounce === 1) {
                let r = this.randomLose()
                this.target = this.determineMaxPossibleHeight()
                this.botTarget = this.target.clone().add(r)
                this.moveToInfo.status = 1
                this.ballObj.groundInfo.v.x *= -1
                this.step = 1
            }
            if (this.ballObj.groundInfo.v.x > 0 && this.step === 1) {
                this.step = 0
            }
            if (this.ballObj.groundInfo.v.x > 0 && this.step === 0) {
                this.hitTheBall()
            }
        }
    }

}
