import { Route, Routes } from "react-router-dom"
import { HomePage, MainWrapper, Navbar } from ".."





const MainPage = () => {
    return (
        <MainWrapper>
            {/* <Navbar />  */}
            <Routes>

                <Route path='/' >
                
                    <Route index element={<HomePage />}/>

                    {/* <Route path='Home' element={<HomePage />}/>

                    <Route path='Profile' element={<Profile />}/>

                    <Route path='Chat' element={<Chat />}/>

                    <Route path='Leaderboard' element={<LeaderBoard />}/>

                    <Route path='Play' element={<Game />}/>

                    <Route path='results' element={ <ResultsLatestHome/>} />

                    <Route path='Playthrough' element={ <ChooseGame />} />

                    <Route path='Live' element={<LiveMatches />}/> */}

                </Route>

            </Routes>
        </MainWrapper>
      )
}

export default MainPage