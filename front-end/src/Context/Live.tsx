function AppComponent({isLoaded, appData} : {isLoaded : boolean, appData : any}) {
    if (isLoaded) {
      return (
        <AppDataContext.Provider value={appData}>
          <HomePage></HomePage>
        </AppDataContext.Provider>
      )
    } else {
      return (
         <div>
          Loading ...
        </div>
      )
    }
  }









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




















  import { useEffect, useRef, useState } from "react";
import { LiveItem } from "./LiveItem";
import { useAppDataContext } from "../Context/context";



function getData(fun : any) {
    const [state, setState] = useState(undefined)

    useEffect(() => {
        async function loadData() {
            setState(await fun())
        }
        loadData()
    }, [])

    return (state)
}

function setDataEvent(event : string) {
    const appContext = useAppDataContext()
    const [state, setState] = useState(undefined)

    
    useEffect(() => {
        appContext.socketHandler.on(event, (data : any) => {
            setState(data)
        })
        
        return () => {
            appContext.socketHandler.on(event, undefined)
        }

    }, [])

    return (state)
}

function LiveTitle() {
    const data = setDataEvent("message")

    if (data)
        return <div> Live {data} </div>
    else
        return <div> Live No Data </div>
}

// function LiveTitle() {
//     const appContext = useAppDataContext()
//     const data = getData(appContext.functions.loadData)

//     if (data)
//         return <div> Live {data} </div>
//     else
//         return <div> Live No Data </div>
// }

export function Live() {

    const [state, setState] = useState(undefined)

    useEffect(() => {
        setTimeout((set : Function) => {
            console.log("Time Out")
            set("k")
        }, 3000, setState)
    }, [])

    if (state) {
        return <div> Done ! </div>
    }
    return (
        <>
            <LiveTitle></LiveTitle>
            <LiveItem></LiveItem>
        </>
    )
}