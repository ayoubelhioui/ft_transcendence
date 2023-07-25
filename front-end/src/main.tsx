import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Game.css'
import './index.css'


import {
  BrowserRouter
} from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";
import { AppDataContext } from './Context/Context.ts';
import { appService } from './Context/Service/AppDataService.ts';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>

    <BrowserRouter>
      <ThemeProvider>
        <AppDataContext.Provider value={appService}>
          <App />
        </AppDataContext.Provider>
      </ThemeProvider>
    </BrowserRouter>

  </>,
)
