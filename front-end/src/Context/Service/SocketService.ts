import { io, Socket } from "socket.io-client";
import { RequestService } from "./RequestService";
import { address } from "../../Const";


export class SocketService {
    
    socket : Socket | undefined
    private callBack : Map<string, Function | undefined> = new Map()
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
        this.listen()
    }

    // on(event : string, callBackFunction : Function | undefined) {
    //     this.callBack.set(event, callBackFunction)
    // }

    on(event : string, callBack : any) {
        if (!this.callBack.has(event)) {
            this.callBack.set(event, callBack)
            this.socket?.on(event, callBack)
        }

    }

    private listen() {
        this.socket.on("connect", () => {
           console.log("Client is connected.")
        });

        this.socket.on("disconnect", () => {
            console.log("Client has disconnected.");
        });

    }

    sendEvent(event : string, payload : any) {
        this.socket.emit(event, payload)
    }



}
