import { User } from "src/database/entities"
import { AClient } from "./AClinet"
import { Match } from "./Match"
import { customLog } from "src/Const"

export class Queue {
  private botUser     : AClient
  private randomQueue : AClient[]
  private bot         : AClient | undefined
  private invite      : AClient[]

  constructor() {
      this.botUser = ({ 
        user : {
          IntraId : 2147483647,
          username : "bot"
        }
      }) as AClient
      this.randomQueue = []
      this.bot = undefined
      this.invite = []
  }


  addAndGetMatch(client : AClient) {
      if (this.randomQueue[0]?.id === client.id || this.invite[0]?.id === client.id)
        return
      if (!client.userToInvite && !client.gameToken) {
        if (client.isBotGame) {
          this.bot = client
        } else {
          this.randomQueue.push(client)
        }
      } else {
        this.invite.push(client)
      }
      const match = this.getMatch(client)
      return (match)
  }

   popClient(id : number) {
    for (let i = 0; i < this.randomQueue.length; i++) {
      if (this.randomQueue[i].id == id) {
        this.randomQueue.splice(i , 1);
        i--;
      }
    }

    for (let i = 0; i < this.invite.length; i++) {
      if (this.invite[i].id == id) {
        this.invite.splice(i , 1);
        i--;
      }
    }
  }


  private getMatch(client : AClient) : Match | undefined {
      if (this.bot) {
          const newMatch = new Match(this.bot, this.botUser, true)
          this.bot = undefined
          return newMatch
      }
      if (this.randomQueue.length === 2) {
          const player1 = this.randomQueue.shift()
          const player2 = this.randomQueue.shift()
          const newMatch = new Match(player1, player2, false)
          return newMatch
      }
      //invite
      const myPeer = this.invite.find((item : AClient) => {
          return item.gameToken === client.gameToken && item.id !== client.id
      })
      if (myPeer) {
          const player1 = myPeer
          const player2 = client
          const newMatch = new Match(player1, player2, false)
          this.invite = this.invite.filter((item : AClient) => {
            item !== player1 && item !== player2
          })
          return (newMatch)
      }
      return (undefined)
  }



  print() {
    const a = this.invite.map((item : AClient) => item.toString())
    const b = this.randomQueue.map((item : AClient) => item.toString())
    // //console.log(new Error().stack)
    customLog("invite queue", a) 
    customLog("randomQueue queue", b) 
  }
}