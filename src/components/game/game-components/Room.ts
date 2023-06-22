import { Server, Socket } from 'socket.io';
import { Player } from './player.interface';


export class Room {

    static roomId : number = 0
    static player : number = 0 //! player id

    roomId = Room.roomId
    botMode : boolean
    player1 : Player | undefined = undefined;
    player2 : Player | undefined = undefined;
    closed : Boolean
    game : any

    constructor(isBot : Boolean) {
        if (this.botMode)
            this.closed = true
        Room.roomId++
    }


    add(payload: any, socket : Socket) {
        let newPlayer : Player = {
            id : Room.player++,
            socket : socket
        }
        if (this.player1 === undefined)
            this.player1 = newPlayer
        else if (this.player2 === undefined)
            this.player2 = newPlayer
        if (this.player1 && this.player2) {
            this.closed = true
        }
    }

    getPlayer2Id(socket : Socket) : Socket {
        if (socket.id === this.player1.socket.id)
            return (this.player2.socket)
        return (this.player1.socket)
    }

    #broadCast(event : string, payload1 : any, payload2 : any) {
        this.player1.socket.emit(event, payload1)
        if (this.botMode === false)
            this.player2.socket.emit(event, payload2)
    }

    #sendToOther(event : string, socket : Socket, payload : any) {
        if (this.closed === false)
            return
        const player2 = this.getPlayer2Id(socket)
        player2.emit(event, payload)
    }

    start() {
        this.game = new Game()
        this.game.init(this, this.botMode)
        this.game.gameLoop()

        if (this.botMode === false) {
            this.#broadCast(
                "start", 
                {turn: 0, id: this.player1.socket.id}, 
                {turn: 1, id: this.player2.socket.id}
            )
        } else {
            this.#broadCast(
                "start", 
                {turn: 0, id: this.player1.socket.id},
                undefined
            )
        }
    }

    playerLeft(socket : Socket) {
        if (this.closed === false)
            return
        this.game.stop()
        if (this.botMode === false) {
            this.#sendToOther("", socket, socket)
        }
    }

    //===============

    sendBallInfo(data) {
        //data.position
        //data.velocity
        //data.init
        //data.spotPos
        //data.net
        let data2 = {
            position : {
                x: -data.position.x,
                y: data.position.y,
                z: -data.position.z,
            },
            velocity : {
                x: -data.velocity.x,
                y: data.velocity.y,
                z: -data.velocity.z,
            },
            init : data.init,
            net : data.net
        }
        if (data.spotPos) {
            data2.spotPos = {
                x: -data.spotPos.x,
                y: data.spotPos.y,
                z: -data.spotPos.z
            }
        }
        this.#broadCast("ballInfo", data, data2)
    }

    sendRacketMove(data) {
        if (this.closed === false)
            return
        if (this.botMode)
            return
        let player2 = this.getPlayer2Id(data.socket)
        if (data.socket === this.player1.socket)
            this.game.racketP1.set(-data.position.x, data.position.y, -data.position.z)
        if (data.socket === this.player2.socket)
            this.game.racketP2.set(data.position.x, data.position.y, data.position.z)
        this.server.to(player2).emit("moveRacket", data)
    }
    
    sendBotRacketInfo(data) {
        if (this.closed === false)
            return
        console.log(`Send to ${this.player1.socket}`)
        this.server.to(this.player1.socket).emit("moveRacket", data)
    }

    sendGameScore(data) {
        if (this.closed === false)
            return
        let data2 = {
            score : data.score.reverse()
        }
        this.#broadCast("gameScore", data, data2)
    }

    sendTurn(data) {
        if (this.closed === false)
            return
        this.#broadCast("turn", data, data)
    }


    //!!========

    sendBallInfoClassic(data) {
        //data.position
        //data.velocity
        this.#broadCast("ballInfo", data, data)
    }

    sendPaddleMove(data) {
        this.#broadCast("paddleMove", data, data)
    }

    sendGameScoreClassic(data) {
        if (this.closed === false)
            return
        this.#broadCast("gameScore", data, data)
    }

    //===============

    receiveHitBall(data) {
        let playerType = this.player1.socket === data.socket ? -1 : 1
        data.playerType = playerType
        this.game.ballObj.socketReceiveHit(data)

    }

    //!!========

    receivePaddleMove(data) {
        if (data.socket === this.player1.socket)
            this.game.player1.receivePos(data)
        else if (data.socket === this.player2.socket)
            this.game.player2.receivePos(data)
    }



}
