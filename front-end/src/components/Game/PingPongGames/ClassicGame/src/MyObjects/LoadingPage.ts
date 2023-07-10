import { params } from "../Utils/Params"
import * as THREE from 'three'
import { Game } from "./Game"
import { MyScene } from "./MyScene"
import { MyCamera } from "./MyCamera"
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TrailRenderer } from "./Trail"

class SpinBall extends THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
    
    trail : TrailRenderer
    velocity : THREE.Vector3
    acc : THREE.Vector3

    constructor(game : Game) {
        super()

        this.velocity = new THREE.Vector3(0, 0, 0)
        this.acc = new THREE.Vector3(-8, 0, 0)
   

        this.geometry = new THREE.SphereGeometry(params.ballDim);
        this.material = new THREE.MeshStandardMaterial({ 
            color: 0xff0000, 
            wireframe: false,
            emissive: 0xff0000,
            emissiveIntensity: 4
        });

        this.trail = new TrailRenderer(game, this)

    }


    changePos() {
        this.position.x += this.velocity.x * params.timeStep
        this.position.y += this.velocity.y * params.timeStep
        this.position.z += this.velocity.z * params.timeStep
    }

    changeSpeed() {
        this.velocity.x += this.acc.x * params.timeStep
        this.velocity.y += this.acc.y * params.timeStep
        this.velocity.z += this.acc.z * params.timeStep
    }

    phy() {
        this.changePos()
        this.changeSpeed()
    }

    update() {
        if (Math.abs(this.position.x) > 5)
            this.acc.x *= -1
        this.phy()
        this.trail.update()
    }
}


export class LoadingPage extends THREE.Object3D{
    
    game : Game
    scene : MyScene
    camera : MyCamera
   
    ballObj : SpinBall

    constructor(game : Game) {
        super()
        this.game = game
        this.scene = game.scene
        this.camera = game.camera
        
        
        const objs = this.getObjs()

        this.ballObj = objs.ballObj
        
        this.makeText()

        this.scene.add(this.ballObj)
        this.scene.add(objs.background)
        this.scene.add(this)
    }



    async makeText() {
        const f = new FontLoader()
        const font = await f.loadAsync('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json')
        const textGeometry = new TextGeometry('Hello, World!', {
            font: font, // Replace with your desired font
            size: 1,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: false
        });
        
        // Create a material for the text
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        // Create a mesh and add it to the scene
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Calculate the text geometry dimensions
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x;
        const textHeight = textGeometry.boundingBox!.max.y - textGeometry.boundingBox!.min.y;
        // Center the text horizontally
        textGeometry.translate(-textWidth / 2, 0, 0);

        // Center the text vertically
        textGeometry.translate(0, -textHeight / 2, 0);

        this.scene.add(textMesh)
    }

    getObjs() {

      

      


        const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff
        })
        const geo = new THREE.PlaneGeometry(params.sceneDim.x, params.sceneDim.y)
        const mesh = new THREE.Mesh(geo, mat)
        

      

        
        return {
            ballObj: new SpinBall(this.game),
            background : mesh
        }
    }


    update() {
       this.ballObj.update()
    }
     
}