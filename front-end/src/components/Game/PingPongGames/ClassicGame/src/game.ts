import { Game } from './MyObjects/Game'
import { GameParams } from '../../interfaces/interface.game.params'
import { params } from './Utils/Params'

async function startGame(gameParams : GameParams) {
    const game = new Game(gameParams.gameToken, gameParams.isBotMode)
  
    function gameLoop()
    {
        game.scene.update()
        params.frame++
        game.renderer.render(game.scene, game.camera)
    }
    game.renderer.setAnimationLoop(gameLoop)
}

export default startGame
