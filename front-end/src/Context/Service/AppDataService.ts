import { useState } from "react";
import { AuthService, UserI } from "./AuthService";
import { LoaderService } from "./LoaderService";
import { RequestService } from "./RequestService"
import { SocketService } from "./SocketService"

export interface AppInterface {
    requestService : RequestService,
    socketService : SocketService,
    authService : AuthService,
    loaderService : LoaderService
}

const authService = new AuthService()
const requestService = new RequestService(authService)
const socketService = new SocketService(requestService)
const loaderService = new LoaderService()

const appService : AppInterface = {
    requestService,
    socketService,
    authService,
    loaderService
}

export {
    appService,
}
