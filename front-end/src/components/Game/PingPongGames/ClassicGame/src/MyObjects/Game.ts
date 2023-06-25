import * as THREE from "three";
import { MyScene } from "./MyScene";
import { MyCamera } from './MyCamera'
import { params } from '../Utils/Params'
import { SocketManager } from "../Utils/SocketManager";
 
export class Game {

    renderer : THREE.WebGLRenderer
    scene : MyScene
    camera : MyCamera
    socketMgr : SocketManager
    token : string
    isBotMode : boolean

    gameInfo = {
        scorePlayer1: 0,
        scorePlayer2: 0,
        start: false,
        turn : 0
    }


    constructor(token : string, isBotMode : boolean) {
      
        this.renderer = this.#setUpRenderer()
        this.scene = new MyScene(this)
        this.camera = new MyCamera()
        this.socketMgr = new SocketManager(this)
        this.token = token
        this.isBotMode = isBotMode
        
        this.#events(this)
    }

    isStarted() {
        return this.gameInfo.start === true
    }

    start(payload : any) {
        console.log("Game is started ...")
        this.gameInfo.turn = payload.turn
        this.gameInfo.start = true
        this.scene.scoreP1.set(0)
        this.scene.scoreP2.set(0)
    }

    changeScore(payload : any) {
        let p = payload.score
        this.gameInfo.scorePlayer1 = p[0]
        this.gameInfo.scorePlayer2 = p[1]
        this.scene.scoreP1.set(this.gameInfo.scorePlayer1)
        this.scene.scoreP2.set(this.gameInfo.scorePlayer2)
    }


    //===========================================
    //===========================================


    #setUpRenderer() {
        //const canvas = document.getElementsByTagName("canvas")[0];
        const renderer = new THREE.WebGLRenderer({
           // canvas: canvas
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        
        const documentRoot = document.getElementById("root")
        documentRoot?.appendChild(renderer.domElement)
        return renderer
    }

   
    #events(obj : Game) {
        window.addEventListener('resize', function() {
            obj.camera.aspect = params.sceneDim.x / params.sceneDim.y;
            obj.camera.updateProjectionMatrix();
            obj.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('keydown', function(e) {
            if (e.key === "ArrowDown" || e.key === "s")
                params.event.x = -1
            if (e.key === "ArrowUp" || e.key === "w")
                params.event.x = 1
        })

        window.addEventListener('keyup', function(e) {
            if (e.key === "ArrowDown" || e.key === "s" || e.key === "ArrowUp" || e.key === "w")
                params.event.x = 0
        })

    }

}





