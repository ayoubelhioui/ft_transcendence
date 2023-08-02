import { Game } from './MyObjects/Game'
import { GameParams } from '../../interfaces/interface.game.params'
import { params } from './Utils/Params'

function getGame(gameParams : GameParams) {
    return new Game(gameParams)
}

async function classicGameStart(game : Game) {  
    function gameLoop()
    {
        game.scene.update()
        params.frame++
        game.renderer.render(game.scene, game.camera)
    }
    game.renderer.setAnimationLoop(gameLoop)
}

export {
    classicGameStart,
    getGame
}
