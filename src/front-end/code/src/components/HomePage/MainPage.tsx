import { Route, Routes } from "react-router-dom"
import { Chat, HomePage, LeaderBoard, OngoingFriendsMatches, MainWrapper, Navbar, Profile, ResultsLatestHome, UserInfo } from ".."
import Game from "../Game/Game"
import ChooseGame from "../Game/ChooseGame"
import { useAppServiceContext } from "../../Context/Service/AppServiceContext"
import { Popup } from "./Popup/Popup"

const MainPage = () => {
    const appService = useAppServiceContext()
    appService.socketService.setUpSocket()
  

    if (appService.authService.user?.isFirstTime) {
      return (
        <MainWrapper>
         <UserInfo />
        </MainWrapper>
      )
    }

    return (
        <MainWrapper>
            <Popup />
            <Navbar /> 
            <Routes>

                <Route path='/' >
                
                    <Route index element={<HomePage />}/>

                    <Route path='Home' element={<HomePage />}/>

                    <Route path='Profile/:id' element={<Profile />}/>
                    <Route path='Profile' element={<Profile />}/>

                    <Route path='Chat' element={<Chat />}/>
                    <Route path='Chat/:id' element={<Chat />}/>

                    <Route path='Leaderboard' element={<LeaderBoard />}/>

                    <Route path='Play' element={<Game />}/>

                    <Route path='results' element={ <ResultsLatestHome/>} />

                    <Route path='Playthrough' element={ <ChooseGame />} />

                    <Route path='FriendsPlaying' element={<OngoingFriendsMatches />}/>


                </Route>

            </Routes>
            
        </MainWrapper>
      )
}

export default MainPage