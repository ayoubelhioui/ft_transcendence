import { Socket } from "socket.io"
import { User } from "src/database/entities"
import { PlayerJoin } from "../interfaces/play-join.interface"
import { customLog } from "src/Const"
import * as clc from 'cli-color';

export class AClient {
  id : number
  username : string
  user : User
  socket : Socket
  isClassicGame : boolean
  isBotGame : boolean
  gameToken? : string //the user that has been invited must have this token from the link, this token will be created by the sender
  userToInvite : number

  constructor(payload : PlayerJoin, socket : Socket) {
      this.id = payload.user.id
      this.username = payload.user.username
      this.user = payload.user
      this.socket = socket
      this.isClassicGame = payload.isClassic
      this.isBotGame = payload.isBotMode
      this.gameToken = payload.token
      this.userToInvite = payload.userToInvite

      customLog(
          clc.bgBlue("Client: "), 
          clc.green("socketId: "), this.socket.id,
          clc.green("IsBotMode: "), payload.isBotMode,
          clc.green("IsClassic: "), payload.isClassic,
          clc.green("UserToInvite: "), payload.userToInvite,
          clc.green("token: "), payload.token,
          clc.green("userId: "), payload.user.id
      )
  }

  toString() {
    return `${this.username}(${this.id})`
  }

}
