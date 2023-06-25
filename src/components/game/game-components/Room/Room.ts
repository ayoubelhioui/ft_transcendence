import { Socket } from 'socket.io';
import { Player } from './player.interface';
import { PlayerScores } from '../../dto/player-scores.dto';
import { GameService } from '../../game.service';

export class Room {

    static roomId : number = 0

    roomId = Room.roomId
    type : number = -1
    isBotMode : boolean
    player1 : Player | undefined = undefined;
    player2 : Player | undefined = undefined;
    closed : Boolean = false
    gameToken : string; //!game token
    protected gameService : GameService

    constructor(isBotMode : boolean, gameService : GameService) {
        this.isBotMode = isBotMode
        this.gameService = gameService
        if (this.isBotMode)
            this.closed = true
        Room.roomId++
    }


    add(payload: any, socket : Socket) {
        let newPlayer : Player = {
            id : payload.user.id,
            socket : socket,
            user : payload.user
        }
        if (this.player1 === undefined)
            this.player1 = newPlayer
        else if (this.player2 === undefined)
            this.player2 = newPlayer
        if (this.player1 && this.player2) {
            this.closed = true
        }
    }

    getPlayer2Id(socketId : string) : Socket {
        if (socketId === this.player1.socket.id)
            return (this.player2.socket)
        return (this.player1.socket)
    }

    broadCast(event : string, payload1 : any, payload2 : any) {
        this.player1.socket.emit(event, payload1)
        if (this.isBotMode === false)
            this.player2.socket.emit(event, payload2)
    }

    sendToOther(event : string, socket : Socket, payload : any) {
        if (this.closed === false)
            return
        const player2 = this.getPlayer2Id(socket.id)
        player2.emit(event, payload)
    }

    async gameScoreTrigger(scores : PlayerScores) {
        let maxScore = 7
        if(scores.player1Score == maxScore || scores.player2Score == maxScore)
        {
            // return await this.gameService.setGameResult(this.player1.id, this.gameToken ,
            //     scores.player1Score, scores.player2Score);
            return (false) //! end game
        }
        return (false)
    }
}
