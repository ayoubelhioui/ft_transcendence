
import { Navbar, HomePage, Profile, SignIn, Chat, LeaderBoard, ResultsLatestHome, LiveMatches} from './components/index'
import { authContext } from './components/context/useContext';

import { Navigate } from "react-router-dom";

import TwoFactor from './components/twoFactor';
import ChooseGame from './components/ChooseGame';
import Game from './components/Game/Game';

import React, { ReactNode, useEffect, useState } from 'react';



import {
  Route,
  Routes,
} from "react-router-dom";
import { useAppServiceContext } from './Context/Context';
import { resultStatusI } from './Context/Service/AuthService';
import { STATUS_ERROR, STATUS_NOT_SIGN_IN, STATUS_SUCCESS, STATUS_UNDEFINED } from './Const';



export const ProtectedRoute: React.FC<{children: any}> = ( { children } ) => {
  const auth = authContext();


  if (!auth.isAuthenticated)
    return <Navigate to="/sign-in" replace />;

  return ( children );
}


const MainWrapper = ( {children} : {children : ReactNode} ) => {
  return (
    <>
      <div className='h-screen max-md:h-[1400px] max-custom-md:h-[1500px] relative overflow-hidden'>
        <div className='h-full flex items-center max-m-custom-md:h-full'>
          <div className="flex flex-col my-auto bg-profile-bg bg-cover bg-center rounded-[10px] max-sm:rounded-none w-[60%] mx-auto max-w-[1650px] h-[1100px] max-md:w-[100%] max-md:max-w-[1800px] max-sm:drop-shadow-none max-md:h-[100%] max-md:mt-3 max-sm:mt-0 max-sm:max-w-[1800px] max-h-[100%] max-m-custom-md:w-[100%] max-m-custom-md:h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const LoadingPage = () => {
  return (
    <MainWrapper>
      <div> Loading... </div>
    </MainWrapper>
  )
}

const MainPage = () => {
  return (
    <MainWrapper>
      <div> Hi! </div>
    </MainWrapper>
  )
}

const App = () => {
  const [status, setStatus] = useState(STATUS_UNDEFINED)
  const appService = useAppServiceContext();

  useEffect(() => {
    async function prepare() {
      await appService.authService.authenticated((result : resultStatusI) => {
        setStatus(result.status)
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
    return <SignIn />
  } else if (status === STATUS_SUCCESS) {
    return <MainPage />
  } else {
    throw Error("Can't handle this error : " + status)
  }
}

export default App
