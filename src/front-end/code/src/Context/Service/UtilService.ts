import { useEffect, useState } from "react"
import { LoaderResult } from "../../components/Game/PingPongGames/3dGame/src/interfaces/interface.load.result"
import { GameParamsCollect } from "../../components/Game/PingPongGames/interfaces/interface.game.params"


export enum Triggers {
    RefreshProfile,
    RefreshListFriend,
    RefreshNotification,
    RefreshProfileImageOfOnlineFriend,
}

export class UtilService {
    
    private reRenderMap : Map<number, any>

    gameResources : LoaderResult | undefined
    gameParams : GameParamsCollect | undefined

    constructor() {
        this.gameParams = undefined
        this.gameResources = undefined
        this.reRenderMap = new Map()
    }

    addTrigger(event : number) {
        const [state, setState] = useState(false)
        this.reRenderMap.set(event, () => setState((value : boolean) => !value))
        return state
    }

    trigger(event : number) {
        if (!this.reRenderMap.has(event))
            return
        this.reRenderMap.get(event)()
    }

}