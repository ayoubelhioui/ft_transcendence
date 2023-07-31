import { NavLink, Route, Routes } from "react-router-dom"
import { Chat, HomePage, LeaderBoard, LiveMatches, MainWrapper, Navbar, Profile, ResultsLatestHome } from ".."
import Game from "../Game/Game"
import ChooseGame from "../Game/ChooseGame"
import { useAppServiceContext } from "../../Context/Context"
import { appService } from "../../Context/Service/AppDataService"
import { useEffect, useState } from "react"
import Modal from 'react-modal';

import { Avatar } from "@mui/material"

import { ImCross } from "react-icons/im"


Modal.setAppElement('#root');


const Popup = () => {
    const appService = useAppServiceContext() 
    const [isOpen, setIsOpen] = useState(true);
    const [content, setContent] = useState("");

    useEffect(() => {
        const event = "on_message_send"
        appService.socketService.on(event, (data : any) => {
            setContent(data.message)
            setIsOpen(true)
        })
    
        return (() => {
          appService.socketService.off(event)
        })
      }, [])

    const onRequestClose = () => {
        
        setIsOpen(false);
    };

    return (
        <Modal 
        isOpen={true}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        className="modal-content border-none outline-none bg-none"
        overlayClassName="modal-backdrop"
        shouldCloseOnOverlayClick={true}
      >
        
        <div className=" text-black items-center justify-center w-[50px]">
          <Avatar alt="Avatar" src="" />
          <div className="flex flex-col">
            <h2>User's Name</h2>
            <p>{content}</p>
          </div>
          
          {/* Add the line to represent the time the popup will appear */}
          {/* <NavLink to="/Chat"> h </NavLink>
          <div className="time-line w-full h-1 bg-gray-400" style={{ width: `${50}%` }}></div> */}
          {/* <button onClick={onRequestClose} className=" absolute"> <ImCross size={15}/> </button> */}
        </div>
        
      </Modal>
    );
  };


const MainPage = () => {
    const appService = useAppServiceContext()
    appService.socketService.setUpSocket()
  
    return (
        <MainWrapper>
            {/* <Popup /> */}
            <Navbar /> 
            <Routes>

                <Route path='/' >
                
                    <Route index element={<HomePage />}/>

                    <Route path='Home' element={<HomePage />}/>

                    <Route path='Profile/:id' element={<Profile />}/>
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