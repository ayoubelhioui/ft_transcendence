import * as dat from 'dat.gui'
import {params} from '../Utils/Params'
import { Game } from './Game'
import * as THREE from "three";

export class GuiParams {

    //?destroy
    game : Game
    isExist = new Map()
    gui = new dat.GUI()

    constructor(game : Game) {
        this.game = game

        this.setUp()
    }

    setUp() {
        this.gui.add(params, 'enableOrbit');
        this.gui.addColor(params, 'color');
    }


    //let pos = this.game.guiParams.getVal("psss", {x:0, y:2, z:0}, -2, 4, 0.001)
    getVal(name : string, dic : Object, min = 0, max = 100, step = 1) {
        if (!name)
            return

        if (!this.isExist.has(name)){
            const newFolder = this.gui.addFolder(name);
            newFolder.open()
            for (let item in dic) {
                let a : keyof Object = item as keyof Object
                newFolder.add(dic, a, min, max).step(step)
            }
            this.isExist.set(name, dic)
        }
        return (this.isExist.get(name))
    }

    guiChangeValues() {
        this.game.orbit.enabled = params.enableOrbit

        let bloom = this.getVal("bloom", {threshold: 0.6, strength:0.35, radius:0}, 0, 10, 0.01)
        this.game.bloomPass.threshold = bloom.threshold;
        this.game.bloomPass.strength = bloom.strength;
        this.game.bloomPass.radius = bloom.radius;

        //light
        let light = this.getVal("light", {
            spotIntensity: 1.6, 
            penumbra:params.penumbra,
            angle:params.angle,
            amIntensity: params.intensity,
        }, 0, 10, 0.01)
    
        //this.game.this.gameInfo.start = true; this.game.ballObj.position.y = 0; this.game.ballObj.velocity.y = 15
        //this.game.tableColor.material.color = new THREE.Color(params.color)

        this.game.spotLight.intensity = light.spotIntensity
        this.game.spotLight.penumbra = light.penumbra
        this.game.spotLight.angle = light.angle
        this.game.ambientLightObj.intensity = light.amIntensity


        const tableModel = this.game.tableModel
        tableModel.traverse((node) => {
            const meshNode = node as THREE.Mesh
            if (meshNode.isMesh) {
                const mat = meshNode.material as THREE.MeshStandardMaterial
                if (meshNode.id === 15) {
                    //table color
                    mat.color = new THREE.Color(params.color)
                }
            }
        })
    }

    remove() {
        this.gui.destroy()
    }

    update() {
        this.guiChangeValues()
    }
}