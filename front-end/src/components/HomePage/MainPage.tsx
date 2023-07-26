import { Route, Routes } from "react-router-dom"
import { Chat, HomePage, LeaderBoard, LiveMatches, MainWrapper, Navbar, Profile, ResultsLatestHome } from ".."
import Game from "../Game/Game"
import ChooseGame from "../Game/ChooseGame"
import { useAppServiceContext } from "../../Context/Context"
import { appService } from "../../Context/Service/AppDataService"


const MainPage = () => {
    const appService = useAppServiceContext()
    appService.socketService.setUpSocket()
    
    return (
        <MainWrapper>
            <Navbar /> 
            <Routes>

                <Route path='/' >
                
                    <Route index element={<HomePage />}/>

                    <Route path='Home' element={<HomePage />}/>

                    <Route path='Profile' element={<Profile />}/>

                    <Route path='Chat' element={<Chat />}/>

                    <Route path='Leaderboard' element={<LeaderBoard />}/>

                    <Route path='Play' element={<Game />}/>

                    <Route path='results' element={ <ResultsLatestHome/>} />

                    <Route path='Playthrough' element={ <ChooseGame />} />

                    <Route path='Live' element={<LiveMatches />}/>

                </Route>

            </Routes>
        </MainWrapper>
      )
}

export default MainPage