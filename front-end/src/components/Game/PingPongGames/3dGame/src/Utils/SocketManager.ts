import { Game } from "../MyObjects/Game";
import { Socket, io } from 'socket.io-client'
import { params } from './Params'

export class SocketManager {

    socket : Socket

    constructor(game : Game) {
        this.socket = this.getSocket(game)
    }

    hitBall(payload : any) {
        if (!this.socket)
            return
        //payload.distX
        //payload.distY
        this.socket.emit("hitBall", payload)
    }

    lose(payload : any) {
        if (!this.socket)
            return
        this.socket.emit("lose", payload)
    }

    racketMove(payload : any) {
        if (!this.socket)
            return
        //payload.position
        
        payload.position = payload.position.clone()
        payload.position.z *= -1
        payload.position.x *= -1
        this.socket.emit("moveRacket", payload)
    }
    
    //###########################################
    //###########################################
    //###########################################

    getSocket(game : Game) {
        let token = ""
        
        //localStorage.setItem("lastname", "Smith");
        let a = localStorage.getItem("token");
        if (a) {
            console.log(a)
            token = a
        }
    
        const socket = io("http://192.168.1.9:3001" , {
            extraHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        
        socket.on("connect", () => {
            console.log("Client is connected")
        
            //after connecting
            socket.emit("join_game", ({
                isBotMode : params.botSocket,
                isClassic : false,
            }))
        
            // socket.on('disconnected', () => {
            //     socket.emit('leave', "aaa");
            // });
        })
    
        
        socket.on("start", (data) => {
            // data.turn
            console.log(data)
            game.start(data)
        })
    
        socket.on("end_game", () => {
            console.log("end-game")
            game.gameInfo.start = false
            //!end game
        })
        
        socket.on("ballInfo", (data) => {
            game.ballObj.socketGetBallInfo(data)
        })
    
        // socket.on("player2Event", (data) => {
        //     //data.ballPosition
        //     //data.ballVelocity
        //     game.player2.socketReceive(data)
        // })
    
        socket.on("moveRacket", (data) => {
            //data.position
            //console.log(data)
            game.player2.socketMoveRacket(data)
        })
    
        socket.on("gameScore", (data) => {
            game.gameInfo.scorePlayer1 = data.score[0]
            game.gameInfo.scorePlayer2 = data.score[1]
            console.log("game score", game.gameInfo)
        })
    
        socket.on("turn", (data) => {
            game.gameInfo.turn = data.turn
        })
    
        // socket.on("loseEvent", (data) => {
        //     game.ballObj.socketLose(data)
        // })
    
        socket.on("opponentLeft", (data) => {
            console.log("opponentLeft ", data)
            game.gameInfo.start = false
            alert("Game End!!!")
        })
    
        return (socket)
    }
    
}