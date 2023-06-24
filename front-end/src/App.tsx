
import { Navbar, HomePage, Profile, SignIn, Chat, LeaderBoard } from './components/index'
import { authContext } from './components/context/useContext';

import { Navigate } from "react-router-dom";

import TwoFactor from './components/twoFactor';

import React from 'react';

import './App.css'

import {
  Route,
  Routes,
} from "react-router-dom";

export const ProtectedRoute: React.FC<{children: any}> = ( { children } ) => {
  const auth = authContext();


  if (!auth.isAuthenticated)
    return <Navigate to="/" replace />;

  return ( children );
}


const App = () => {
  const authApp = authContext();



  return (
    <div className=' h-[1020px] max-md:h-[1300px] '>
      <div className=' w-full flex absolute top-1/2 -translate-y-1/2 max-sm:top-0 max-sm:-translate-y-0 '>
        <div className="flex flex-col bg-profile-bg bg-cover bg-center rounded-[10px] max-sm:rounded-none w-[70%] mx-auto max-w-[1600px] h-[85vh] max-md:w-[100%] max-md:max-w-[1800px] max-sm:drop-shadow-none max-md:h-[100%] max-md:mt-3 max-sm:mt-0 max-sm:max-w-[1800px]">
         
        { !authApp.isAuthenticated && <SignIn /> }

        
        { authApp.isAuthenticated && <Navbar /> }

          <Routes>

            { !authApp.isAuthenticated && <Route path='/two-factor' element={(<TwoFactor />)}/> }

            <Route path='/' >
              <Route index element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>
              <Route path='Home' element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>
              <Route path='Profile' element={(<ProtectedRoute> <Profile /> </ProtectedRoute>)}/>
              <Route path='Chat' element={(<ProtectedRoute> <Chat /> </ProtectedRoute>)}/>
              <Route path='Leaderboard' element={(<ProtectedRoute> <LeaderBoard /> </ProtectedRoute>)}/>
              {/*<Route path='/logout' element={<SignIn />} />*/}
            </Route>

          {/* check when the user type the url of /two-factor then i need to prevent him from accessing it unless he is logged out or something...  */}

            

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
