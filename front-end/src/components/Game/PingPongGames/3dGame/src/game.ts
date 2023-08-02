import { params } from './Utils/Params'
import { load } from './Utils/Loader'
import { Game } from './MyObjects/Game'
import { GameParams } from '../../interfaces/interface.game.params';
import { LoaderResult } from './interfaces/interface.load.result';


function getThreeGame(gameParams : GameParams, resources : LoaderResult) {
    return new Game(gameParams, resources)
}

async function threeGameStart(game : Game) {
    function gameLoop()
    {
        game.update()
        params.frame++
        //game.bloomComposer.render()
        game.renderer.render(game.scene, game.camera)
    }

    game.renderer.setAnimationLoop(gameLoop)
}

export {
    threeGameStart,
    getThreeGame
}

