import { Game } from "../MyObjects/Game";
import { Socket, io } from 'socket.io-client'
import { LiveData } from "../interfaces/interface.live.data";

export class SocketManager {

    socket : Socket
    socketAddr : string

    constructor(game : Game) {
        const host = import.meta.env.VITE_HOST || 'localhost'
        const port = import.meta.env.VITE_SERVER_PORT || '80'
        this.socketAddr = `http://${host}:${port}`
        this.socket = this.getSocket(game)
    }

    hitBall(payload : any) {
        if (!this.socket)
            return
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

    socketOn(socket : Socket, game : Game) {
        if (!game.gameParams.isWatchMode) {
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
                game.player2.socketMoveRacket(data)
            })
        
            socket.on("gameScore", (data) => {
                game.changeScore(data)
            })
        
            socket.on("turn", (data) => {
                game.gameInfo.turn = data.turn
            })
        
        } else {

            socket.on("live_data", (data : LiveData) => {
                game.changeScore({
                    score : data.score.reverse()
                })
                game.ballObj.socketGetBallInfo(data.ballInfo)
                game.player2.socketMoveRacket({position: data.racketPlayer1Pos})
                game.racketObj.socketMoveRacket({position: data.racketPlayer2Pos})
            })

        }
    }

    getSocket(game : Game) {
        const socket = io(this.socketAddr , {
            extraHeaders: {
                Authorization: `Bearer ${game.gameParams.authToken}`
            }
        })
        
        socket.on("connect", () => {
            console.log("Client is connected")
        
            //after connecting
            socket.emit("join_game", ({
                isClassic : false,
                isBotMode : game.gameParams.isBotMode,
                isWatchMode : game.gameParams.isWatchMode,
                token : game.gameParams.gameToken,
                userToInvite : game.gameParams.userToInvite,
            }))
        
            // socket.on('disconnected', () => {
            //     socket.emit('leave', "aaa");
            // });
        })
    
        
        this.socketOn(socket, game)
    
        return (socket)
    }
    
}