import * as THREE from "three";
import {params} from '../Utils/Params'
import { Game } from "./Game";
import { ScoreNbr } from "./ScoreNbr";




export class MyScene extends THREE.Scene {
   
    game : Game
    scoreP1 : ScoreNbr
    scoreP2 : ScoreNbr
 
    tableColor : THREE.Color = new THREE.Color(0)

    constructor (game : Game) {
        super()

        this.game = game
        this.scoreP1 = new ScoreNbr(2, 5, -10, 0xff0000)
        this.scoreP2 = new ScoreNbr(2, 5, 10, 0x0000ff)
        this.scoreP1.set(0)
        this.scoreP2.set(0)
        this.scoreP1.rotation.set(0, Math.PI / 2, 0)
        this.scoreP2.rotation.set(0, Math.PI / 2, 0)
        this.add(this.scoreP1)
        this.add(this.scoreP2)

        this.#modelsObj()

       
        const environmentSceneObj = this.#environmentScene()
        this.add(environmentSceneObj)

        

        
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
        ////console.log(bexWithTexMultiMaterial[0])
        const boxObj = new THREE.Mesh(boxGeometry, bexWithTexMultiMaterial)
        //boxObj.receiveShadow = true
        boxObj.scale.x = params.sceneBox.width
        boxObj.scale.y = params.sceneBox.height
        boxObj.scale.z = params.sceneBox.depth
        boxObj.position.y = params.sceneBox.posY
        
        return (boxObj)      
    }

    #modelsObj() {
        const tableModel = this.game.tableModel
        ////console.log(loaderResult.models.table)
        tableModel.traverse((node) => {
            const meshNode = node as THREE.Mesh;
            if (meshNode.isMesh) {
                //const mat = meshNode.material as THREE.MeshStandardMaterial
                meshNode.receiveShadow = true;
            }
        });
        tableModel.position.y = params.table.posY
        tableModel.rotation.y = 0.5 * Math.PI
        tableModel.scale.set(params.table.width, params.table.height, params.table.depth)
    
        /***************************************** */

        ////console.log(loaderResult.models.racket)
        const racketModel = this.game.racketModel
        racketModel.traverse((node) => {
            const meshNode = node as THREE.Mesh;
            ////console.log(node)
            if (meshNode.isMesh) {
                const mat = meshNode.material as THREE.MeshStandardMaterial
                meshNode.castShadow = true;
                //meshNode.material.depthFunc = 3
                if (mat.name === "Back.Rubber.Material") {
                    //meshNode.material = racketMat.clone()
                    mat.color.set(0xff0000)
                    ////console.log(meshNode)
                } else if (mat.name === "Front.Rubber.Material") {
                    //mat = racketMat.clone()
                    mat.color.set(0x0000ff)
                    //meshNode.material.depthFunc = 2 
                    ////console.log(meshNode)
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
        this.add(tableModel)
    }

}