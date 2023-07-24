import { io, Socket } from "socket.io-client";
import { RequestService } from "./RequestService";
import { address } from "../../Const";


export class SocketService {
    
    private socket : Socket
    private callBack : Map<string, Function | undefined> = new Map()
    private requestService : RequestService

    constructor(requestService : RequestService) {
        this.socket = io(`http://${address}`)
        this.requestService = requestService
        this.listen()
    }

    private setEvent(event : string, fun : (data : any) => any) {
        this.socket.on(event, async (data : any) => {
            if (this.callBack.has(event)){
                const received = await fun(data)
                this.callBack.get(event)?.(received)
            }
        });
    }

    on(event : string, callBackFunction : Function | undefined) {
        this.callBack.set(event, callBackFunction)
    }

    private listen() {
        this.socket.on("connect", () => {
           console.log("Client is connected.")
        });

        this.setEvent('message', async (data : any) => {
            const a = await this.requestService.socketLoadData(data)
            return a
        })
    }

}
