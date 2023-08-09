import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './Game.css'
import './index.css'


import {
  BrowserRouter
} from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";
import { AppServiceProvider } from './Context/Service/AppServiceContext.tsx';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>

    <BrowserRouter>
      <ThemeProvider>
        <AppServiceProvider>
          <App />
        </AppServiceProvider>
      </ThemeProvider>
    </BrowserRouter>

  </>,
)
