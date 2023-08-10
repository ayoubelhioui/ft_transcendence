
import { Socket } from 'socket.io-client'
import { Game as ClassicGame } from '../ClassicGame/src/MyObjects/Game'
import { Game as ThreeGame } from '../3dGame/src/MyObjects/Game'
import { GameState } from '../GameState'

export class SocketManager {

  socket : Socket
  game : ClassicGame | ThreeGame

  constructor(game : ClassicGame | ThreeGame) {
    this.game = game
    this.socket = this.game.gameParams.socket
    if (!this.socket)
      throw new Error("Socket not defined")
  }

  //###########################################
  //############# On
  //###########################################

  protected socketOn(game : ClassicGame | ThreeGame) {
    function onStart(data : any) {
      game.start(data)
    }

    function onEnd(data : any) {
      game.end(data)
    }

    function onException(data : any) {
      console.log("exception", data)
      game.gameParams.callBack(GameState.gameException)
    }

    function onGameScore(data : any) {
      game.changeScore(data)
    }

    this.socket.on("start", onStart)
    this.socket.on("end_game", onEnd)
    this.socket.on("gameScore", onGameScore)
    this.socket.on("exception", onException)
  }

 
  //###########################################
  //############## Emit
  //###########################################

  lose(payload : any) {
    this.socket.emit("lose", payload)
  }

  emitJoin(isClassic : boolean) {
    const obj = {
      isClassic : isClassic,
      isBotMode : this.game.gameParams.isBotMode,
      token : this.game.gameParams.gameToken,
      userToInvite : this.game.gameParams.userToInvite,
    }
    console.log("Emit join game", obj)
    this.socket.emit("join_game", obj)
  }


  //###########################################
  //############# Stop
  //###########################################

  protected stop() {
      this.socket.off("start")
      this.socket.off("end_game")
      this.socket.off("gameScore")
      this.socket.off("exception")
  }

}
