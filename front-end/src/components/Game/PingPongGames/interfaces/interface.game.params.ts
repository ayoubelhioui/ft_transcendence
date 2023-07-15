export interface GameParams {
    isWatchMode : boolean,
    gameToken : string,
    isBotMode : boolean,
    canvas : any,
    userToInvite : string,
    callBack : (state: number) => void
}
