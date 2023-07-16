export interface GameParams {
    isWatchMode : boolean,
    gameToken : string,
    isBotMode : boolean,
    isClassic : boolean,
    userId : string,
    canvas : any,
    userToInvite : string,
    callBack : (state: number) => void
}
