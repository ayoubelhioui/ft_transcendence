export interface GameParams {
    type : number, //watch or play
    gameToken : string,
    isBotMode : boolean,
    canvas : any,
    callBack : (state: number) => void
}
