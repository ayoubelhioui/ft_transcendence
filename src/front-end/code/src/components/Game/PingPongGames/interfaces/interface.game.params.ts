import { Socket } from 'socket.io-client'
import { LoaderResult } from '../3dGame/src/interfaces/interface.load.result.ts'

export interface GameParams {
    isClassic : boolean,
    isBotMode : boolean,
    userId : number,
    canvas : any,
    authToken : string,
    socket : Socket
    callBack : (state: number) => void
    resources : LoaderResult
    userToInvite? : number,
    gameToken? : string,
}

export interface GameParamsCollect {
    isClassic : boolean,
    isBotMode? : boolean,
    userId? : number,
    canvas? : any,
    gameToken? : string,
    userToInvite? : number,
    authToken? : string,
    socket? : Socket
    callBack? : (state: number) => void
    resources? : LoaderResult
}
