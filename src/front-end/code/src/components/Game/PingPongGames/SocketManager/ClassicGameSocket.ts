import { SocketManager } from "./SocketManager"
import { Game as ClassicGame } from '../ClassicGame/src/MyObjects/Game'

export class ClassicGameSocket extends SocketManager {
  
  game : ClassicGame

  constructor(game : ClassicGame) {
    super(game)
    this.game = game

    this.socketOn(this.game)
  }

  //###########################################
  //############## On
  //###########################################

  
  protected socketOn(game : ClassicGame) {

    function onBallInfo(data : any) {
      game.scene.ballObj.socketGetBallInfo(data)
    }
  
    function onPaddleMove(data : any) {
      if (data?.id === 1)
          game.scene.player1.receivePos(data)
      else if (data?.id === 2)
          game.scene.player2.receivePos(data)
    }

    this.socket.on("ballInfo", onBallInfo)
    this.socket.on("paddleMove", onPaddleMove)
    super.socketOn(game)
  }

  //###########################################
  //############## Emit
  //###########################################

  movePaddle(payload : any) {
    this.socket.emit("movePaddle", payload)
  }

  //###########################################
  //############## Stop
  //###########################################

  stop() {
      this.socket.off("ballInfo")
      this.socket.off("paddleMove")
      super.stop()
  }

}