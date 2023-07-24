import { AuthService } from "./AuthService";
import { RequestService } from "./RequestService"
import { SocketService } from "./SocketService"

export interface AppInterface {
    requestService : RequestService,
    socketService : SocketService,
    authService : AuthService
}

const requestService = new RequestService()
const socketService = new SocketService(requestService)
const authService = new AuthService()

const appData : AppInterface = {
    requestService,
    socketService,
    authService,
}

export {
    appData,
}
