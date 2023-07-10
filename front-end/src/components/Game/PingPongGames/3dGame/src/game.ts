import { params } from './Utils/Params'
import { load } from './Utils/Loader'
import { Game } from './MyObjects/Game'
import { GameParams } from '../../interfaces/interface.game.params';
import { LoaderResult } from './interfaces/interface.load.result';


async function threeGameStart(gameParams : GameParams) {
    const resources = (await load() as LoaderResult)
    const game = new Game(gameParams, resources)
 
    function gameLoop()
    {
        game.update()
        params.frame++
        //game.renderer.render(game.scene, game.camera)
        game.bloomComposer.render()
    }

    game.renderer.setAnimationLoop(gameLoop)
}

export default threeGameStart
