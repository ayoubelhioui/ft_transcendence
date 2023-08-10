import * as THREE from "three";
import { MyScene } from "./MyScene";
import { MyCamera } from './MyCamera'
import { params } from '../Utils/Params'
import { GameParams } from "../../../interfaces/interface.game.params";
import { GameState } from "../../../GameState";
import { ClassicGameSocket } from "../../../SocketManager/ClassicGameSocket";
 
export class Game {

    renderer : THREE.WebGLRenderer
    scene : MyScene
    camera : MyCamera
    socketMgr : ClassicGameSocket
    gameParams : GameParams
    eventsCallBack : any[]

    gameInfo = {
        scorePlayer1: 0,
        scorePlayer2: 0,
        start: false,
        turn : 0
    }


    constructor(gameParams : GameParams) {
        this.gameParams = gameParams
        this.renderer = this.#setUpRenderer()
        this.scene = new MyScene(this)
        this.camera = new MyCamera()
        this.socketMgr = new ClassicGameSocket(this)
        this.eventsCallBack = []

        this.scene.visible = false
        this.#events(this)
        this.socketMgr.emitJoin(true)

    }

    isStarted() {
        return this.gameInfo.start === true
    }

    start(payload : any) {
        console.log("Game is started ...")
        this.gameInfo.turn = payload.turn
        this.scene.visible = true
        this.gameInfo.start = true
        this.scene.scoreP1.set(0)
        this.scene.scoreP2.set(0)
        this.gameParams.callBack(GameState.gameStarted)
    }

    end(payload : any) {
        //console.log("Game is Ended ...", payload)
        this.scene.visible = false
        this.gameInfo.start = false
        if (params.frame > 10) {
            if (payload.isWin)
                this.gameParams.callBack(GameState.gameEndedWin)
            else
                this.gameParams.callBack(GameState.gameEndedLoss)
        } else {
            this.gameParams.callBack(GameState.gameException)
        }
    }

    changeScore(payload : any) {
        let p = payload.score
        this.gameInfo.scorePlayer1 = p[0]
        this.gameInfo.scorePlayer2 = p[1]
        this.scene.scoreP1.set(this.gameInfo.scorePlayer1)
        this.scene.scoreP2.set(this.gameInfo.scorePlayer2)
        //console.log("game score", this.gameInfo)
    }

    loop() {
        const game = this
        function gameLoop()
        {
            game.scene.update()
            params.frame++
            game.renderer.render(game.scene, game.camera)
        }
        game.renderer.setAnimationLoop(gameLoop)
    }

    stop() {
        window.removeEventListener('resize', this.eventsCallBack[0]);
        window.removeEventListener('keydown', this.eventsCallBack[1]);
        window.removeEventListener('keyup', this.eventsCallBack[2]);
        this.socketMgr.stop()
        this.renderer.setAnimationLoop(null)
        this.renderer.dispose();
    }

    //===========================================
    //===========================================


    #setUpRenderer() {
        const renderer = new THREE.WebGLRenderer({
           canvas: this.gameParams.canvas
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        
        //const documentRoot = document.getElementById("root")
        //documentRoot?.appendChild(renderer.domElement)
        return renderer
    }

   
    #events(obj : Game) {
        const resizeCallBack = function() {
            obj.camera.aspect = params.sceneDim.x / params.sceneDim.y;
            obj.camera.updateProjectionMatrix();
            obj.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        const keyDownCallBack = function(e : any) {
            if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
                params.event.x = -1
            if (e.key === "ArrowUp" || e.key === "w" || e.key === "W")
                params.event.x = 1
        }

        const keyUpCallBack = function(e : any) {
            if (e.key === "ArrowDown" 
            || e.key === "s" 
            || e.key === "ArrowUp" 
            || e.key === "w"
            || e.key === "W"
            || e.key === "S"
            )
                params.event.x = 0
        }

        window.addEventListener('resize', resizeCallBack);
        window.addEventListener('keydown', keyDownCallBack)
        window.addEventListener('keyup', keyUpCallBack)

        this.eventsCallBack = [resizeCallBack, keyDownCallBack, keyUpCallBack]
    }

}





