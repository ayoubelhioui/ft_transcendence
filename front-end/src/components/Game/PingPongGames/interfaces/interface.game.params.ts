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
}
