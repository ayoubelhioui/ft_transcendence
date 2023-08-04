import * as THREE from "three";
import { GuiParams } from "./GuiParams";
import { MyScene } from "./MyScene";
import { MyCamera } from './MyCamera'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import {params} from '../Utils/Params'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { SocketManager } from "../Utils/SocketManager";
import { LoaderResult } from "../interfaces/interface.load.result";
import { AmbientLight } from "./AmbientLight";
import { Ball } from "./Ball";
import { Racket } from "./Racket";
import { Net } from "./Net";
import { SpotLight } from "./SpotLight";
import { Player2 } from "./Player2";
import { GameParams } from "../../../interfaces/interface.game.params";
import { GameState } from "../../../GameState";


export class Game {

    renderer : THREE.WebGLRenderer
    scene : MyScene
    camera : MyCamera
    bloomComposer : EffectComposer
    bloomPass : UnrealBloomPass
    //guiParams : GuiParams
    orbit : OrbitControls
    socketMgr : SocketManager
    resources : LoaderResult
    eventsCallBack : any[]
    // canvas : any
    // token : string
    // isBotMode : boolean
    // callBack : (state: number) => void

    //objs
    ambientLightObj : AmbientLight
    spotLight : SpotLight
    netObj : Net
    ballObj : Ball
    racketObj : Racket
    player2 : Player2
    tableModel : THREE.Group
    racketModel : THREE.Group
    gameParams : GameParams

    gameInfo = {
        turn: 0, //the player that will shot the ball
        scorePlayer1: 0,
        scorePlayer2: 0,
        start: false
    }


    constructor(gameParams : GameParams) {
        this.gameParams = gameParams
        this.resources = gameParams.resources
        this.tableModel = this.resources.models.table.scene
        this.racketModel = this.resources.models.racket.scene
        this.renderer = this.#setUpRenderer()
        this.scene = new MyScene(this)
        this.camera = new MyCamera()
        this.socketMgr = new SocketManager(this)
        this.eventsCallBack = []

        this.ambientLightObj = new AmbientLight(this)
        this.spotLight = new SpotLight(this)
        this.netObj = new Net(this)
        this.ballObj = new Ball(this)
        this.racketObj = new Racket(this)
        this.player2 = new Player2(this)
        
        const bloom = this.#setUpBloomRenderer()
        this.bloomComposer = bloom.bloomComposer
        this.bloomPass = bloom.bloomPass
        
        this.gameInfo = {
            turn: 0, //the player that will shot the ball
            scorePlayer1: 0,
            scorePlayer2: 0,
            start: false
        }
        
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement)
        this.orbit.enabled = false
        //this.guiParams = new GuiParams(this)
        this.scene.visible = false
        this.#events(this)

        if (this.gameParams.isWatchMode) {
            params.enableOrbit = true
            this.start({})
        }

        //window.game = this
    }

    start(payload : any) {
        console.log("Game is started ...")
        this.gameInfo.turn = payload.turn
        this.gameInfo.start = true
        this.scene.visible = true
        this.scene.scoreP1.set(0)
        this.scene.scoreP2.set(0)
        this.gameParams.callBack(GameState.gameStarted)
    }

    end(payload : any) {
        console.log("Game is Ended ...", payload)
        this.gameInfo.start = false
        this.scene.visible = false
        if (payload.isWin)
            this.gameParams.callBack(GameState.gameEndedWin)
        else
            this.gameParams.callBack(GameState.gameEndedLoss)
    }

    changeScore(payload : any) {
        let p = payload.score
        this.gameInfo.scorePlayer1 = p[0]
        this.gameInfo.scorePlayer2 = p[1]
        this.scene.scoreP1.set(this.gameInfo.scorePlayer1)
        this.scene.scoreP2.set(this.gameInfo.scorePlayer2)
        console.log("game score", this.gameInfo)
    }

    getTurn() {
        return this.gameInfo.turn
    }

    update() {
        //this.guiParams.update()
        if (!this.gameInfo.start)
           return
        this.netObj.update()
        this.ballObj.update()
        if (!this.gameParams.isWatchMode)
            this.racketObj.update()
        this.player2.update()
    }

    loop() {

        const game = this
        function gameLoop()
        {
            game.update()
            params.frame++
            //game.bloomComposer.render()
            game.renderer.render(game.scene, game.camera)
        }
    
        game.renderer.setAnimationLoop(gameLoop)
    }

    stop() {
        window.removeEventListener('resize', this.eventsCallBack[0]);
        window.removeEventListener('mousemove', this.eventsCallBack[1]);
        window.removeEventListener('mousedown', this.eventsCallBack[2]);
        window.removeEventListener('mouseup', this.eventsCallBack[3]);
        this.socketMgr.stop()
        this.renderer.setAnimationLoop(null)
        this.renderer.dispose();

        //getElementById("") 
        console.log("remove orbit")
        //this.guiParams.remove()
       
    }

    //===========================================
    //===========================================

    #setUpRenderer() {
        //THREE.ColorManagement.enabled = true;
        const renderer = new THREE.WebGLRenderer({
            canvas: this.gameParams.canvas,
            alpha : true,
            antialias: true,
        })
        //renderer.sortObjects = true
        // renderer.setPixelRatio(window.devicePixelRatio * 1);
        //renderer.outputColorSpace = THREE.SRGBColorSpace;
        // THREE.SRGBColorSpace = "srgb"
        renderer.shadowMap.enabled = true; // Enable shadow map rendering
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Type of shadow map
        
        renderer.setSize(window.innerWidth, window.innerHeight)
        
        //const documentRoot = document.getElementById("root")
        //documentRoot?.appendChild(renderer.domElement)
        return renderer
    }


    #setUpBloomRenderer() {
        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0, 2, 0
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 2;
        bloomPass.radius = 0;

        const bloomComposer = new EffectComposer(this.renderer);
        bloomComposer.setSize(window.innerWidth, window.innerHeight);
        bloomComposer.renderToScreen = true;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);
        return ({
            bloomPass,
            bloomComposer
        })
    }

   

    #events(obj : Game) {

        const resizeCallBack = function() {
            obj.camera.aspect = window.innerWidth / window.innerHeight;
            obj.camera.updateProjectionMatrix();
            obj.renderer.setSize(window.innerWidth, window.innerHeight);
            obj.bloomComposer.setSize(window.innerWidth, window.innerHeight);
        }

        const mousemoveCallBack = function(e : any) {
            params.mouse.oldX = params.mouse.x;
            params.mouse.oldY = params.mouse.y;
            params.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            params.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
            params.mouse.vx = params.mouse.x - params.mouse.oldX;
            params.mouse.vy = params.mouse.y - params.mouse.oldY; 
        }

        const mousedownCallBack = function(e : any) {
            params.mouse.cx = (e.clientX / window.innerWidth) * 2 - 1;
            params.mouse.cy = - (e.clientY / window.innerHeight) * 2 + 1;
            params.mouse.isClicked = true
            //console.log("onmousedown", params.mouseClickPos)
        }

        const mouseupCallBack =  function() {
            params.mouse.isClicked = false
            //console.log("onmouseup", params.mouseClickPos)
        }

        window.addEventListener('resize', resizeCallBack);

        window.addEventListener('mousemove', mousemoveCallBack)

        window.addEventListener('mousedown', mousedownCallBack)

        window.addEventListener('mouseup', mouseupCallBack)

        this.eventsCallBack = [
            resizeCallBack,
            mousemoveCallBack,
            mousedownCallBack,
            mouseupCallBack
        ]
    }

}





