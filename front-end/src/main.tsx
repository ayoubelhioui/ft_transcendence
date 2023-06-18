// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthProvider } from './components/context/useContext';

import {
  BrowserRouter
} from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>

    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>

  </>,
)
