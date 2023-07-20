import { Game } from "../MyObjects/Game";
import { Socket, io } from 'socket.io-client'

export class SocketManager {

    socket : Socket
    socketAddr : string

    constructor(game : Game) {
        const host = import.meta.env.VITE_HOST || 'localhost'
        const port = import.meta.env.VITE_SERVER_PORT_Khalid || '80'
        this.socketAddr = `http://${host}:${port}`
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
    
        const socket = io(this.socketAddr , {
            extraHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        
        socket.on("connect", () => {
            console.log("Client is connected")
        
            //after connecting
            socket.emit("join_game", ({
                isBotMode : game.isBotMode,
                isClassic : false,
            }))
        
            // socket.on('disconnected', () => {
            //     socket.emit('leave', "aaa");
            // });
        })
    
        
        socket.on("start", (data) => {
            game.start(data)
        })
    
        socket.on("end_game", (data) => {
            game.end(data)
        })
        
        socket.on("ballInfo", (data) => {
            game.ballObj.socketGetBallInfo(data)
        })
    
    
        socket.on("moveRacket", (data) => {
            //data.position
            //console.log(data)
            game.player2.socketMoveRacket(data)
        })
    
        socket.on("gameScore", (data) => {
            game.changeScore(data)
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