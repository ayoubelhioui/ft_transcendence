import { Game } from './MyObjects/Game'
import { GameParams } from '../../interfaces/interface.game.params'
import { params } from './Utils/Params'

async function classicGameStart(gameParams : GameParams) {
    const game = new Game(gameParams)
  
    function gameLoop()
    {
        game.scene.update()
        params.frame++
        game.renderer.render(game.scene, game.camera)
    }
    game.renderer.setAnimationLoop(gameLoop)
}

export default classicGameStart
