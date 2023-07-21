
import { Navbar, HomePage, Profile, SignIn, Chat, LeaderBoard, ResultsLatestHome, LiveMatches} from './components/index'
import { authContext } from './components/context/useContext';

import { Navigate } from "react-router-dom";

import TwoFactor from './components/twoFactor';
import ChooseGame from './components/ChooseGame';
import Game from './components/Game/Game';

import React from 'react';

import './App.css'

import {
  Route,
  Routes,
} from "react-router-dom";



export const ProtectedRoute: React.FC<{children: any}> = ( { children } ) => {
  const auth = authContext();


  if (!auth.isAuthenticated)
    return <Navigate to="/sign-in" replace />;

  return ( children );
}


const App = () => {
  const authApp = authContext();

  return (
    <>
      <div className=' h-screen max-md:h-[1400px] max-custom-md:h-[1500px] relative overflow-hidden'>
        <div className='h-full flex items-center max-m-custom-md:h-full'>
          <div className="flex flex-col my-auto bg-profile-bg bg-cover bg-center rounded-[10px] max-sm:rounded-none w-[60%] mx-auto max-w-[1650px] h-[1100px] max-md:w-[100%] max-md:max-w-[1800px] max-sm:drop-shadow-none max-md:h-[100%] max-md:mt-3 max-sm:mt-0 max-sm:max-w-[1800px] max-h-[100%] max-m-custom-md:w-[100%] max-m-custom-md:h-full">
          { authApp.isAuthenticated && <Navbar /> }

            <Routes>

              { !authApp.isAuthenticated && <Route path='/two-factor' element={(<TwoFactor />)}/> }

              <Route path='/sign-in' element={<SignIn />} />

              <Route path='/' >
                
                  <Route index element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>

                  <Route path='Home' element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>

                  <Route path='Profile' element={(<ProtectedRoute> <Profile /> </ProtectedRoute>)}/>

                  <Route path='Chat' element={(<ProtectedRoute> <Chat /> </ProtectedRoute>)}/>

                  <Route path='Leaderboard' element={(<ProtectedRoute> <LeaderBoard /> </ProtectedRoute>)}/>

                  <Route path='Play' element={(<ProtectedRoute> <Game /> </ProtectedRoute>)}/>

                  <Route path='results' element={ (<ProtectedRoute> <ResultsLatestHome/> </ProtectedRoute>)} />

                  <Route path='Playthrough' element={ (<ProtectedRoute> <ChooseGame /> </ProtectedRoute>)} />

                  <Route path='Live' element={(<ProtectedRoute> <LiveMatches /> </ProtectedRoute>)}/>

              </Route>

            {/* check when the user type the url of /two-factor then i need to prevent him from accessing it unless he is logged out or something...  */}

            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
