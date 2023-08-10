import { SocketManager } from "./SocketManager"
import { Game as ThreeGame } from '../3dGame/src/MyObjects/Game'

export class ThreeGameSocket extends SocketManager {
  
  game : ThreeGame

  constructor(game : ThreeGame) {
    super(game)
    this.game = game

    this.socketOn(this.game)
  }

  //###########################################
  //############## On
  //###########################################

  protected socketOn(game : ThreeGame) {

    function onBallInfo(data : any) {
      game.ballObj.socketGetBallInfo(data)
    }
  
    function onMoveRacket(data : any) {
      game.player2.socketMoveRacket(data)
    }
  
    function onTurn(data : any) {
      game.gameInfo.turn = data.turn
    }

    this.socket.on("ballInfo", onBallInfo)
    this.socket.on("moveRacket", onMoveRacket)
    this.socket.on("turn", onTurn)
    super.socketOn(game)
  }

  //###########################################
  //############## Emit
  //###########################################

  hitBall(payload : any) {
    this.socket.emit("hitBall", payload)
  }

  racketMove(payload : any) {
      payload.position = payload.position.clone()
      payload.position.z *= -1
      payload.position.x *= -1
      this.socket.emit("moveRacket", payload)
  }

  //###########################################
  //############## Stop
  //###########################################


  stop() {
      this.socket.off("ballInfo")
      this.socket.off("moveRacket")
      this.socket.off("turn")
      super.stop()
  }
}