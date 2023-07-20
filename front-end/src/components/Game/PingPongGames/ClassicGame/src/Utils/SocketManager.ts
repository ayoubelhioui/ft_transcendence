import { Game } from "../MyObjects/Game"
import { Socket, io } from 'socket.io-client'
import { address } from "../../../../../../Const"


export class SocketManager {

    socket : Socket
    socketAddr : string

    constructor(game : Game) {
        this.socketAddr = `http://${address}`
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
        //payload.e
        //payload.id
        this.socket.emit("movePaddle", payload)
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
        const socket = io(this.socketAddr, {
            extraHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        
        socket.on("connect", () => {
            console.log("Client is connected")
        
            //after connecting
            socket.emit("join_game", ({
                isBotMode : game.isBotMode,
                isClassic : true,
                //! token
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
            game.scene.ballObj.socketGetBallInfo(data)
        })
    
        // socket.on("player2Event", (data) => {
        //     //data.ballPosition
        //     //data.ballVelocity
        //     game.scene.player2.socketReceive(data)
        // })
    
        socket.on("paddleMove", (data) => {
            //data.e
            //data.id
            //console.log("paddleMove")
            if (data?.id === 1)
                game.scene.player1.receivePos(data)
            else if (data?.id === 2)
                game.scene.player2.receivePos(data)
        })
    
        socket.on("gameScore", (data) => {
            game.changeScore(data)
        })
    
        // socket.on("turn", (data) => {
        //     game.gameInfo.turn = data.turn
        // })
    
        // socket.on("loseEvent", (data) => {
        //     game.scene.ballObj.socketLose(data)
        // })
    
        // socket.on("opponentLeft", (data) => {
        //     console.log("opponentLeft ", data)
        //     game.gameInfo.start = false
        //     alert("Game End!!!")
        // })
    
        return (socket)
    }

}
