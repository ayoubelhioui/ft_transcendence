import * as THREE from "three";
import { Ball } from "./Ball";
import { params } from "../Utils/Params";
import { Player1 } from "./Player1";
import { Player2 } from "./Player2";
import { ScoreNbr } from "./ScoreNbr";
import { Game } from "./Game";


export class MyScene extends THREE.Scene {

    scoreP1 : ScoreNbr
    scoreP2 : ScoreNbr
    game : Game
    ballObj : Ball
    player1 : Player1
    player2 : Player2

    constructor (game : Game) {
        super()

        this.game = game
        this.game.scene = this
        this.ballObj = new Ball(game)
        this.player1 = new Player1(game)
        this.player2 = new Player2(game)
        this.scoreP1 = new ScoreNbr(-4, + params.sceneDim.y / 2 - 0.1)
        this.scoreP2 = new ScoreNbr(2.5, + params.sceneDim.y / 2 - 0.1)

        this.#setEnvironment()
    }

    #setEnvironment() {
        this.#centerLineObj()
        this.#upperAndLowerLines()
        this.#scoreNumber()
    }

    #centerLineObj() {
        let sizeX = 0.1
        let nbPart = 50
        let partSize = params.sceneDim.y / nbPart
        const mat = new THREE.MeshBasicMaterial({
            color: 0xdddddd,
            side: THREE.DoubleSide
        })
        for (let i = 0; i < nbPart; i++) {
            if (i % 2 === 0)
                continue
            const geo = new THREE.PlaneGeometry(sizeX, partSize)
            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.set(0, i * partSize - params.sceneDim.y / 2, 0)
            this.add(mesh)
        }
    }

    #upperAndLowerLines() {
        let sizeY = 0.2
        const mat = new THREE.MeshBasicMaterial({
            color: 0xdddddd,
            side: THREE.DoubleSide
        })
        

        const upper_geo = new THREE.PlaneGeometry(params.sceneDim.x * 0.99, sizeY)
        const upper_mesh = new THREE.Mesh(upper_geo, mat)
        upper_mesh.position.set(0, params.sceneDim.y * 0.5 + sizeY, 0)
        this.add(upper_mesh)

        const lower_geo = new THREE.PlaneGeometry(params.sceneDim.x * 0.99, sizeY)
        const lower_mesh = new THREE.Mesh(lower_geo, mat)
        lower_mesh.position.set(0, params.sceneDim.y * -0.5 - sizeY, 0)
        this.add(lower_mesh)
    }

    #scoreNumber() {
        this.scoreP1.set(0)
        this.scoreP2.set(0)
        this.add(this.scoreP1)
        this.add(this.scoreP2)
    }

    
    updatePaddle() {
        //send event to the server
        if (params.event.x && this.game.isStarted())
            this.game.socketMgr.racketMove({e: params.event.x})
    }

    update() {
        if (!this.game.gameInfo.start)
           return
        this.ballObj.update()
        this.updatePaddle()
       
    }

}