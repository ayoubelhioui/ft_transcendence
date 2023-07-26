import { IBallInfo } from "../Interfaces/interface.ball.info"
import { LiveData } from "../Interfaces/interface.live.data"
import { Game } from "../MyObjects/Game"
import { Socket, io } from 'socket.io-client'

export class SocketManager {

    socket : Socket
    socketAddr : string

    constructor(game : Game) {
        const host = import.meta.env.VITE_HOST || 'localhost'
        const port = import.meta.env.VITE_SERVER_PORT || '80'
        this.socketAddr = `http://${host}:${port}`
        this.socket = this.getSocket(game)
    }

    lose(payload : any) {
        if (!this.socket)
            return
        this.socket.emit("lose", payload)
    }

    racketMove(payload : any) {
        if (!this.socket)
            return
        this.socket.emit("movePaddle", payload)
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
                game.scene.ballObj.socketGetBallInfo(data)
            })
        
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


            socket.on("new_notification", (data) => {
                console.log("new notification",  data)
            })

            socket.on("exception", (data) => {
                console.log("exception",  data)
            })

        } else {
            socket.on("live_data", (data : LiveData) => {
                game.scene.player1.receivePos({y : data.paddlePlayer1})
                game.scene.player2.receivePos({y : data.paddlePlayer2})
                game.changeScore({
                    score : data.score
                })
                const ballData : IBallInfo = {
                    position : data.position,
                    velocity : data.velocity,
                    speed : data.speed
                }
                game.scene.ballObj.socketGetBallInfo(ballData)
            })
        }

    }

    getSocket(game : Game) {
        
        const socket = io(this.socketAddr, {
            extraHeaders: {
                Authorization: `Bearer ${game.gameParams.authToken}`
            }
        })
        
        socket.on("connect", () => {
            console.log("Client is connected")
        
            //after connecting
            const obj = {
                isClassic : true,
                isBotMode : game.gameParams.isBotMode,
                isWatchMode : game.gameParams.isWatchMode,
                token : game.gameParams.gameToken,
                userToInvite : game.gameParams.userToInvite,
            }
            socket.emit("join_game", obj)
            console.log("join game: ", obj)
        
            // socket.on('disconnected', () => {
            //     socket.emit('leave', "aaa");
            // });
        })
    

        this.socketOn(socket, game)


        return (socket)
    }

}
