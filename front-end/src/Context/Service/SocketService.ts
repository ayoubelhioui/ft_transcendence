import { io, Socket } from "socket.io-client";
import { RequestService } from "./RequestService";
import { address, STATUS_SUCCESS } from "../../Const";


export class SocketService {
    
    private socket : Socket | undefined
    private requestService : RequestService
    listFriends : any[]
    listNotification : any[]
    allFriendsList : any[]
    setRerender? : any = undefined
    setRerenderProfile? : any = undefined


    constructor(requestService : RequestService) {
        this.requestService = requestService
        this.listFriends = []
        this.listNotification = []
        this.allFriendsList = []
    }

    async getListNotification() {
        const res = await this.requestService.getNotification()
        if (res.status === STATUS_SUCCESS) {
            console.log("Notification", res)
            this.listNotification = res.data
        }
    }


    async getListOfAllFriends() {
        const res = await this.requestService.getAllUserFriends()
        if (res.status === STATUS_SUCCESS) {
            this.allFriendsList = res.data
        }
    }


    setUpSocket() {

        this.getListNotification()
        this.getListOfAllFriends()

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

        //======= friends

        this.socket.on("newFriendOnline", (data : any) => {
            console.log("newFriendOnline", data)
            let isExist = this.listFriends.find((item : any) => item.id === data?.user?.id)
            if (!isExist) {
                this.listFriends.push(data?.user)
            }
            this.setRerender?.((value : any) => !value)
            this.setRerenderProfile?.((value : any) => !value)
        })
    
        this.socket.on("friendDisconnect", (data : any) => {
            console.log("friendDisconnect", data)
            this.listFriends = this.listFriends.filter((item : any) => item.id !== data?.user?.id)
            this.setRerender?.((value : any) => !value)
            this.setRerenderProfile?.((value : any) => !value)
        })

        this.socket.on("myOnlineFriends", (data : any[]) => {
            console.log("myOnlineFriends", data)
            this.listFriends = data
            this.setRerender?.((value : any) => !value)
            this.setRerenderProfile?.((value : any) => !value)
        })


        //============================= Notification

        this.socket.on("new_notification", (data : any) => {
            console.log("notification", data?.notification)
            this.listNotification.push(data.notification)
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
