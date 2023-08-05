import { User } from "src/database/entities"
import { AClient } from "./AClinet"

export class Match {
  player1 : AClient
  player2 : AClient
  isBotGame : boolean

  constructor(player1 : AClient, player2 : AClient, isBotGame : boolean) {
      this.player1 = player1
      this.player2 = player2
      this.isBotGame = isBotGame
  }
}
