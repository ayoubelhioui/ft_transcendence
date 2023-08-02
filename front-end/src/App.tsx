import { useEffect, useState } from 'react';
import { useAppServiceContext } from './Context/Context';
import { resultStatusI } from './Context/Service/AuthService';
import { STATUS_ERROR, STATUS_NOT_SIGN_IN, STATUS_SUCCESS, STATUS_UNDEFINED } from './Const';
import { LoadingPage, MainPage, SignIn } from './components';
import { load } from './components/Game/PingPongGames/3dGame/src/Utils/Loader';
import { LoaderResult } from './components/Game/PingPongGames/3dGame/src/interfaces/interface.load.result';


const App = () => {
  const [status, setStatus] = useState(STATUS_UNDEFINED)
  const appService = useAppServiceContext();

  useEffect(() => {
    async function prepare() {
      const gameResources = (await load() as LoaderResult)
      appService.utilService.gameResources = gameResources
      await appService.authService.authenticated((result : resultStatusI) => {
        setTimeout((res : any) => {
          setStatus(res.status)
        }, 2000, result)
      })
    }
    prepare()
  }, [])

  if (status === STATUS_UNDEFINED) {
    return <LoadingPage />
  } else if (status === STATUS_NOT_SIGN_IN || status === STATUS_ERROR) {
    if (status === STATUS_ERROR) {
      // popup error
    }
    return <SignIn/>
  } else if (status === STATUS_SUCCESS) {
    return <MainPage />
  } else {
    throw Error("Can't handle this error : " + status)
  }
}

export default App
