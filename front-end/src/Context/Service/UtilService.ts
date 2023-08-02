import { LoaderResult } from "../../components/Game/PingPongGames/3dGame/src/interfaces/interface.load.result"
import { GameParamsCollect } from "../../components/Game/PingPongGames/interfaces/interface.game.params"


export class UtilService {
    
    gameResources : LoaderResult | undefined
    gameParams : GameParamsCollect | undefined

    constructor() {
        this.gameParams = undefined
        this.gameResources = undefined
    }


}