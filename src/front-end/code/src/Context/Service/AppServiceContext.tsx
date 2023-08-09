import { createContext, useContext } from "react";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";
import { RequestService } from "./RequestService"
import { SocketService } from "./SocketService"

export interface IAppService {
    requestService : RequestService,
    socketService : SocketService,
    authService : AuthService,
    utilService : UtilService
}

//*********************** create context

const AppServiceContext = createContext<IAppService | undefined>(undefined)


//*********************** use context

function useAppServiceContext() {

    const appData = useContext(AppServiceContext)

    if (appData === undefined) {
        throw new Error("AppData is not defined");
    }

    return (appData)
}


//*********************** provider

function AppServiceProvider({ children } : {children : any }) {
  const authService = new AuthService()
  const utilService = new UtilService()
  const requestService = new RequestService(authService)
  const socketService = new SocketService(requestService, utilService)

  const appService : IAppService = {
    requestService,
    socketService,
    authService,
    utilService
  }

  return (
    <AppServiceContext.Provider value={appService}>
      {children}
    </AppServiceContext.Provider>
  );
};



export {
    AppServiceProvider,
    useAppServiceContext
}
