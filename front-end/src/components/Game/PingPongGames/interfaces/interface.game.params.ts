import { LoaderResult } from '../3dGame/src/interfaces/interface.load.result.ts'

export interface GameParams {
    isWatchMode : boolean,
    isBotMode : boolean,
    isClassic : boolean,
    userId : number,
    canvas : any,
    gameToken : string | null,
    userToInvite : number | null,
    authToken : string,
    callBack : (state: number) => void
    resources : LoaderResult
}
