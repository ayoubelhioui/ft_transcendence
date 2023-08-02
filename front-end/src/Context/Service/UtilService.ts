import { GameParams } from "../../components/Game/PingPongGames/interfaces/interface.game.params"


export class UtilService {
    
    gameParams : GameParams | undefined

    constructor() {
        this.gameParams = undefined
    }

    async load() {
        
    }
}