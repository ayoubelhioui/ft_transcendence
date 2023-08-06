import { GameState } from "../../../GameState"
import { IBallInfo } from "../Interfaces/interface.ball.info"
import { LiveData } from "../Interfaces/interface.live.data"
import { Game } from "../MyObjects/Game"
import { Socket, io } from 'socket.io-client'

export class SocketManager {

    socket : Socket

    constructor(game : Game) {
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
                //console.log("Game start with: ", data)
                game.start(data)
            })
        
            socket.on("end_game", (data) => {
                //console.log("End Game Event")
                game.end(data)
            })
        
            socket.on("ballInfo", (data) => {
                game.scene.ballObj.socketGetBallInfo(data)
            })
        
            socket.on("paddleMove", (data) => {
                //data.e
                //data.id
                ////console.log("paddleMove")
                if (data?.id === 1)
                    game.scene.player1.receivePos(data)
                else if (data?.id === 2)
                    game.scene.player2.receivePos(data)
            })

            socket.on("gameScore", (data) => {
                game.changeScore(data)
            })


            socket.on("new_notification", (data) => {
                //console.log("new notification",  data)
            })

            socket.on("exception", (data) => {
                game.gameParams.callBack(GameState.gameException)
                //console.log("exception",  data)
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
        
        // const socket = io(this.socketAddr, {
        //     extraHeaders: {
        //         Authorization: `Bearer ${game.gameParams.authToken}`
        //     }
        // })
        const socket = game.gameParams.socket
        
        //socket.on("connect", () => {
            //console.log("Client is connected with : ", socket.id)
        
            //after connecting
            const obj = {
                isClassic : true,
                isBotMode : game.gameParams.isBotMode,
                isWatchMode : game.gameParams.isWatchMode,
                token : game.gameParams.gameToken,
                userToInvite : game.gameParams.userToInvite,
            }
            socket.emit("join_game", obj)
            //console.log("join game: ", obj)
        
            // socket.on('disconnected', () => {
            //     socket.emit('leave', "aaa");
            // });

            // socket.on("disconnect", () => {
            //     //console.log("Disconnected", socket.id)
            // })

        //})
    

        this.socketOn(socket, game)


        return (socket)
    }

    stop() {
        this.socket.off("start")
        this.socket.off("end_game")
        this.socket.off("ballInfo")
        this.socket.off("paddleMove")
        this.socket.off("gameScore")
        this.socket.off("new_notification")
        this.socket.off("exception")
        this.socket.off("live_data")
        this.socket.off("connect")
        //this.socket.disconnect()
    }

}
