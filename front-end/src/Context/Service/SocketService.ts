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
    }

    emitEvent(event : string, payload : any = {}) {
        this.socket?.emit(event, payload)
    }


}
