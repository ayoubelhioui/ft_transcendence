import { io, Socket } from "socket.io-client";
import { RequestService } from "./RequestService";
import { address } from "../../Const";


export class SocketService {
    
    private socket : Socket | undefined
    private requestService : RequestService

    constructor(requestService : RequestService) {
        this.requestService = requestService
    }


    setUpSocket() {
        this.socket = io(`http://${address}`, {
            extraHeaders: {
                Authorization: `Bearer ${this.requestService.getAuthService.getAccessToken}`
            }
        })


        this.socket.on("connect", () => {
            console.log("Connected")
        })

        this.socket.on("disconnect", () => {
            console.log("disconnected")
        })
    }

    emitEvent(event : string, payload : any = {}) {
        this.socket?.emit(event, payload)
    }

    on(event : string, callBack : any) {
        this.socket?.on(event, callBack)
    }

    off(event : string) {
        this.socket?.off(event)
    }

    getSocket() {
        return this.socket
    }
}
