import { AuthService } from "./AuthService";
import { LoaderService } from "./LoaderService";
import { RequestService } from "./RequestService"
import { SocketService } from "./SocketService"

export interface AppInterface {
    requestService : RequestService,
    socketService : SocketService,
    authService : AuthService,
    loaderService : LoaderService
}

const requestService = new RequestService()
const socketService = new SocketService(requestService)
const authService = new AuthService()
const loaderService = new LoaderService()

const appService : AppInterface = {
    requestService,
    socketService,
    authService,
    loaderService,
}

export {
    appService,
}
