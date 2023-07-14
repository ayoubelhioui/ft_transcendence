// import { useState, useEffect, useContext } from 'react'
// import { Outlet, redirect } from 'react-router-dom';

import { Navbar, HomePage, Profile, SignIn, Chat } from './components/index'
import { authContext } from './components/context/useContext';



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
   
 
        <Routes>
          <Route path='/' >
                
            <Route index element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>
            <Route path='Home' element={(<ProtectedRoute> <HomePage /> </ProtectedRoute>)}/>
            <Route path='Profile' element={(<ProtectedRoute> <Profile /> </ProtectedRoute>)}/>
            <Route path='Chat' element={(<ProtectedRoute> <Chat /> </ProtectedRoute>)}/>
            <Route path='Play/:type/:id' element={(<ProtectedRoute> <Game /> </ProtectedRoute>)}/>
            
          </Route>
          
        </Routes>

 
        
      
  )
}

export default App
