import { io, Socket } from "socket.io-client";
import { RequestService } from "./RequestService";
import { address, STATUS_SUCCESS } from "../../Const";
import { Triggers, UtilService } from "./UtilService";
import { popupContentI } from "../../components/HomePage/Popup/Popup";
import { INotification, NotificationType } from "../../components/Navbar/Notifications";
import { UserI } from "./AuthService";



export class SocketService {
    
    private socket : Socket | undefined
    private readonly requestService : RequestService
    private readonly utilService : UtilService
    private allFriendsList : any[]
    listFriends : any[]
    listNotification : any[]


    constructor(requestService : RequestService, utilService : UtilService) {
        this.requestService = requestService
        this.utilService = utilService
        this.listFriends = []
        this.listNotification = []
        this.allFriendsList = []
    }

    private async getListNotification() {
        const res = await this.requestService.getNotification()
        if (res.status === STATUS_SUCCESS) {
            this.listNotification = res.data
            this.listNotification = this.listNotification.map((item : any) => {
                if (item.acceptMethod === "POST")
                    item.type = NotificationType.InviteToGroup
                if (item.acceptMethod === "PUT")
                    item.type = NotificationType.FriendRequest
                return item
            })
            //this.utilService.trigger(Triggers.RefreshNotification)
        }
    }


    private async getListOfAllFriends() {
        const res = await this.requestService.getAllUserFriends()
        if (res.status === STATUS_SUCCESS) {
            this.allFriendsList = res.data
            this.utilService.trigger(Triggers.RefreshListFriend)
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


        this.on("connect", () => {
            console.log("Connected")
        })

        this.on("disconnect", () => {
            console.log("disconnected")
        })

        //******************************** friends

        this.on("newFriendOnline", (data : any) => {
            console.log("newFriendOnline", data)
            let isExist = this.listFriends.find((item : any) => item.id === data?.user?.id)
            if (!isExist && data?.user) {
                this.listFriends.push(data.user)
                this.utilService.trigger(Triggers.RefreshListFriend)
                this.utilService.trigger(Triggers.RefreshProfileImageOfOnlineFriend)
            }
            isExist = this.allFriendsList.find((item : any) => item.id === data?.user?.id)
            if (!isExist && data?.user) {
                this.allFriendsList.push(data.user)
            }
        })
    
        this.on("friendDisconnect", (data : any) => {
            console.log("friendDisconnect", data)
            this.listFriends = this.listFriends.filter((item : any) => item.id !== data?.user?.id)
            this.utilService.trigger(Triggers.RefreshListFriend)
            this.utilService.trigger(Triggers.RefreshProfileImageOfOnlineFriend)
        })

        this.on("myOnlineFriends", (data : any[]) => {
            console.log("myOnlineFriends", data)
            this.listFriends = data
            this.utilService.trigger(Triggers.RefreshListFriend)
            this.utilService.trigger(Triggers.RefreshProfileImageOfOnlineFriend)
        })


        //******************************** Notification

        this.on("new_notification", (data : any) => {
            if (data.notification.acceptMethod === "POST")
                data.notification.type = NotificationType.InviteToGroup
            if (data.notification.acceptMethod === "PUT")
                data.notification.type = NotificationType.FriendRequest
            this.listNotification.push(data.notification)
            this.utilService.trigger(Triggers.RefreshNotification)
            this.utilService.trigger(Triggers.RefreshProfile)
        })


    }

    //******************************** Friends Utils */

    isFriendOnline(friendId : number) {
        const isFriend = this.allFriendsList.find((item : any) => item.id === friendId)
        if (isFriend && this.requestService.getAuthService.user && friendId !== this.requestService.getAuthService.user.id) {
            const isOnline = this.listFriends.find((item : any) => item.id === friendId)
            if (isOnline)
                return (true)
            return (false)
        }
        return (undefined)
    }

    //******************************** Notification Utils */

    deleteNotification(item : INotification) {
        console.log("delete notification: ", item)
        this.listNotification = this.listNotification.filter((a : any) => {
            if (a.type === item.type)
                return a.id !== item.id
            return true
        })
        this.utilService.trigger(Triggers.RefreshNotification)
    }

    addNotificationFromPopUp(popupContent : popupContentI) {
        console.log(popupContent)

        const fakeUser = {
            id : popupContent.payload.id,
            username : popupContent.payload.username
        }

        const newItem : INotification = {
            id: this.listNotification.length,
            message : popupContent.message,
            acceptLink : "",
            acceptMethod : "",
            refuseLink : "",
            refuseMethod : "",
            time : new Date(),
            seen : false,
            sender : fakeUser as UserI,
            type : NotificationType.InviteToGame,
            payload : popupContent.payload
        }
        this.listNotification.push(newItem)
        console.log(this.listNotification)
        this.utilService.trigger(Triggers.RefreshNotification)
    }

    //******************************** Socket Utils */

    emitEvent(event : string, payload : any = {}) {
        this.socket?.emit(event, payload)
    }

    on(event : string, callBack : any) {
        console.log(event, "On")
        this.socket?.on(event, callBack)
    }

    off(event : string, listener : any = undefined) {
        console.log(event, "Off")
        this.socket?.off(event, listener)
    }

    getSocket() {
        return this.socket
    }
}
