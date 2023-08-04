import { useState } from "react";
import { AuthService, UserI } from "./AuthService";
import { UtilService } from "./UtilService";
import { RequestService } from "./RequestService"
import { SocketService } from "./SocketService"

export interface AppInterface {
    requestService : RequestService,
    socketService : SocketService,
    authService : AuthService,
    utilService : UtilService
}

const authService = new AuthService()
const requestService = new RequestService(authService)
const socketService = new SocketService(requestService)
const utilService = new UtilService()

const appService : AppInterface = {
    requestService,
    socketService,
    authService,
    utilService
}

export {
    appService,
}
