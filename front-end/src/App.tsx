// import { useState, useEffect, useContext } from 'react'
// import { Outlet, redirect } from 'react-router-dom';

import { Navbar, HomePage, Profile, SignIn, Chat } from './components/index'
import { authContext } from './components/context/useContext';

import { Navigate } from "react-router-dom";

import React from 'react';

import './App.css'

import {
  Route,
  Routes,
} from "react-router-dom";
import Game from './components/Game/Game';

export const ProtectedRoute: React.FC<{children: any}> = ( { children } ) => {
  const auth = authContext();


  // if (!auth.isAuthenticated)
  //   return <Navigate to="/" replace />;

  return ( children );
}

// function NotFound() {
//   const error: any = useRouteError();

//   return (
//     <div className='text-2xl text-white'>
//       <h1 className='text-center'>Oops!</h1>
//       <p className='text-center'>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//     </div>
//   );
// }


const App = () => {
  const authApp = authContext();

  return (
    <div className=' h-[1020px]'>
      <div className=' w-full flex absolute top-1/2 -translate-y-1/2 max-sm:top-0 max-sm:-translate-y-0 '>
        <div className=" flex flex-col bg-profile-bg bg-cover bg-center rounded-[10px] max-sm:rounded-none w-[70%] mx-auto max-w-[1600px] h-[85vh] max-md:w-[95%] max-sm:w-full max-sm:bg-none max-sm:drop-shadow-none max-sm:h-screen ">
        
        {/* {authApp.isAuthenticated && <Navbar />} */}

          {/* {!authApp.isAuthenticated && <SignIn /> } */}
          <Routes>
            <Route path='/' >
                  
              <Route index element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>
              <Route path='Home' element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>
              <Route path='Profile' element={(<ProtectedRoute> <Profile /> </ProtectedRoute>)}/>
              <Route path='Chat' element={(<ProtectedRoute> <Chat /> </ProtectedRoute>)}/>
              <Route path='Play' element={(<ProtectedRoute> <Game /> </ProtectedRoute>)}/>

            </Route>
            
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
