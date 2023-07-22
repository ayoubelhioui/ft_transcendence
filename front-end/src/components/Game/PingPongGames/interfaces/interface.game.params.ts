export interface GameParams {
    isWatchMode : boolean,
    gameToken : number,
    isBotMode : boolean,
    isClassic : boolean,
    userId : number,
    canvas : any,
    userToInvite : number,
    authToken : string,
    callBack : (state: number) => void
}
