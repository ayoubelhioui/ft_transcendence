import { params } from './Utils/Params'
import { load } from './Utils/Loader'
import { Game } from './MyObjects/Game'
import * as THREE from "three";
import { GameParams } from '../../interfaces/interface.game.params';
import { LoaderResult } from './interfaces/interface.load.result';


async function startGame(gameParams : GameParams) {
    const resources = (await load() as LoaderResult)
    const game = new Game(gameParams.gameToken, gameParams.isBotMode, resources)

    //loop
    // function guiChangeValues() {
    //     game.orbit.enabled = params.enableOrbit

    //     let bloom = game.guiParams.getVal("bloom", {threshold: 0.6, strength:0.35, radius:0}, 0, 10, 0.01)
    //     game.bloomPass.threshold = bloom.threshold;
    //     game.bloomPass.strength = bloom.strength;
    //     game.bloomPass.radius = bloom.radius;

    //     //light
    //     let light = game.guiParams.getVal("light", {
    //         spotIntensity: 1.6, 
    //         penumbra:0.45,
    //         angle:0,
    //         amIntensity: 1,
    //     }, 0, 10, 0.01)
    
    //     //game.gameInfo.start = true; game.scene.ballObj.position.y = 0; game.scene.ballObj.velocity.y = 15
    //     game.scene.tableColor.material.color = new THREE.Color(params.color)

    //     game.scene.spotLight.intensity = light.spotIntensity
    //     game.scene.spotLight.penumbra = light.penumbra
    //     game.scene.spotLight.angle = light.angle
    //     game.scene.ambientLightObj.intensity = light.amIntensity
    // }


    // function interpolateColors(ratio, color1, color2) {
    //     let rgb1 = {
    //         r : (color1 >> 16) & 255,
    //         g : (color1 >> 8) & 255,
    //         b : (color1) & 255,
    //     }
    //     let rgb2 = {
    //         r : (color2 >> 16) & 255,
    //         g : (color2 >> 8) & 255,
    //         b : (color2) & 255,
    //     }
    //     let r = Math.round((1 - ratio) * rgb1.r + ratio * rgb2.r);
    //     let g = Math.round((1 - ratio) * rgb1.g + ratio * rgb2.g);
    //     let b = Math.round((1 - ratio) * rgb1.b + ratio * rgb2.b);
      
    //     return (r << 16 | g << 8 | b);
    // }

    // function getHexColor(color) {
    //     return (color.r << 16 | color.g << 8 | color.b)
    // }

    // function racketEffect() {
    //     //console.log( game.scene.racketMat)
    //     let ratio = (params.changeable.value + 1) / 2
    //     ratio = ratio * ratio
    //     //game.scene.racketMat.emissiveIntensity = 4
    //     let newColor = interpolateColors(ratio, 0x003898, 0xe8a115)
    //     game.scene.racketMat.color.set(newColor)
    //     game.scene.racketMat.emissive.set(newColor)
    //     //this.getHexColor(this.interpolateColors(item.scale.x))
    //     params.changeable.value += params.changeable.speed
    //     if (Math.abs(params.changeable.value) > 1) {
    //         params.changeable.value = 1 * Math.sign(params.changeable.value)
    //         params.changeable.speed *= -1
    //     }
    // }

    function gameLoop()
    {
        //guiChangeValues()
        game.scene.update()
        // racketEffect()

        // let p = game.guiParams.getVal("pos", {x: 0, y:5, z:0}, -20, 20, 0.1)
        // game.scene.spotLight.position.set(p.x, p.y, p.z)

        params.frame++
        game.renderer.render(game.scene, game.camera)
        //game.bloomComposer.render()
    }


    game.renderer.setAnimationLoop(gameLoop)
}

export default startGame
