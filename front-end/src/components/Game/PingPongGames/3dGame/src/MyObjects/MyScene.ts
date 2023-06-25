import * as THREE from "three";
import {params} from '../Utils/Params'

import { AmbientLight } from "./AmbientLight";
import { Ball } from "./Ball";
import { Racket } from "./Racket";
import { Net } from "./Net";
import { SpotLight } from "./SpotLight";
import { Player2 } from "./Player2";
import { Game } from "./Game";


export class MyScene extends THREE.Scene {
   
    game : Game
    ambientLightObj : AmbientLight
    spotLight : SpotLight
    netObj : Net
    ballObj : Ball
    racketObj : Racket
    player2 : Player2
    tableModel : any
    racketModel : any
    tableColor : THREE.Color = new THREE.Color(0)

    constructor (game : Game) {
        super()

        this.game = game
        this.ambientLightObj = new AmbientLight(game)
        this.spotLight = new SpotLight(game)
        this.netObj = new Net(game)
        this.ballObj = new Ball(game)
        this.racketObj = new Racket(game)
        this.player2 = new Player2(game)

        //const wallsObj = this.#wallsObj()
        const models = this.#modelsObj()

        if (params.loadTex) {
            const environmentSceneObj = this.#environmentScene()
            this.add(environmentSceneObj)
        }
        
        this.tableModel = models.tableModel
        this.add(this.tableModel)

        //used
        this.racketModel = models.racketModel
    }

   
    #environmentScene() {
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        //const boxGeometry = new THREE.SphereGeometry(50, 100)
      
        const bexWithTexMultiMaterial = [
            new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                // normalMap: loaderResult.tex.backWall.normalMap,
                map: this.game.resources.tex.backWall.tex
            }),//back
            new THREE.MeshStandardMaterial({
                side: THREE.BackSide,
                // normalMap: loaderResult.tex.frontWall.normalMap,
                map: this.game.resources.tex.frontWall.tex,
                // displacementMap : loaderResult.tex.frontWall.displacementMap
            }),//front
            new THREE.MeshStandardMaterial({
                side: THREE.BackSide, 
                // normalMap: loaderResult.tex.floor.normalMap, 
                map: this.game.resources.tex.floor.tex
            }),//up
            new THREE.MeshStandardMaterial({
                side: THREE.BackSide, 
                // normalMap: loaderResult.tex.floor.normalMap, 
                map: this.game.resources.tex.floor.tex
            }),//down
            new THREE.MeshStandardMaterial({
                side: THREE.BackSide, 
                // normalMap: loaderResult.tex.leftWall.normalMap, 
                map: this.game.resources.tex.leftWall.tex
            }),//left
            new THREE.MeshStandardMaterial({
                side: THREE.BackSide, 
                // normalMap: loaderResult.tex.rightWall.normalMap, 
                map: this.game.resources.tex.rightWall.tex
            }),//right
        ]
        //console.log(bexWithTexMultiMaterial[0])
        const boxObj = new THREE.Mesh(boxGeometry, bexWithTexMultiMaterial)
        //boxObj.receiveShadow = true
        boxObj.scale.x = params.sceneBox.width
        boxObj.scale.y = params.sceneBox.height
        boxObj.scale.z = params.sceneBox.depth
        boxObj.position.y = params.sceneBox.posY
        
        return (boxObj)      
    }

    #modelsObj() {
        const tableModel = this.game.resources.models.table.scene
        //console.log(loaderResult.models.table)
        tableModel.traverse((node) => {
            const meshNode = node as THREE.Mesh;
            if (meshNode.isMesh) {
                const mat = meshNode.material as THREE.MeshStandardMaterial

                meshNode.receiveShadow = true;
                // meshNode.material.emissiveIntensity = 0
                
                if (meshNode.id === 16) {
                    //lines 
                    
                    mat.emissive = new THREE.Color("#0000FF")
                    mat.emissiveIntensity = 6
                } else if (meshNode.id === 23) {
                    //legs
                    meshNode.position.y = -0.3
                } else if (meshNode.id === 15) {
                    //table color
                    mat.color = new THREE.Color("#C824B4")
                    this.tableColor = mat.color
                }
                
                
            }
        });
        tableModel.position.y = params.table.posY
        tableModel.rotation.y = 0.5 * Math.PI
        tableModel.scale.set(params.table.width, params.table.height, params.table.depth)
    
        /***************************************** */

        //console.log(loaderResult.models.racket)
        const racketModel = this.game.resources.models.racket.scene
        racketModel.traverse((node) => {
            const meshNode = node as THREE.Mesh;
            //console.log(node)
            if (meshNode.isMesh) {
                const mat = meshNode.material as THREE.MeshStandardMaterial
                meshNode.castShadow = true;
                //meshNode.material.depthFunc = 3
                if (mat.name === "Back.Rubber.Material") {
                    //meshNode.material = racketMat.clone()
                    mat.color.set(0xff0000)
                    //console.log(meshNode)
                } else if (mat.name === "Front.Rubber.Material") {
                    //mat = racketMat.clone()
                    mat.color.set(0x0000ff)
                    //meshNode.material.depthFunc = 2 
                    //console.log(meshNode)
                }
            }
        });
        racketModel.scale.set(1, 1, 1)
        racketModel.rotation.set(0, 0, 0)
        racketModel.position.y = 0


        // const geo = new THREE.CircleGeometry(5, 34)
        // const mat = new THREE.MeshStandardMaterial({
        //     color: 0xffffff,
        //     emissive: 0xff0000,
        //     emissiveIntensity: 6,
        //     side: THREE.DoubleSide
        // })
        // const mesh = new THREE.Mesh(geo, mat)
        // mesh.rotation.set(-Math.PI / 2, 0, 0)
        // this.add(mesh)

        return {
            tableModel,
            racketModel
        }
    }


    update() {
        if (!this.game.gameInfo.start)
           return
        this.netObj.update()
        this.ballObj.update()
        this.racketObj.update()
        this.player2.update()
    }

}