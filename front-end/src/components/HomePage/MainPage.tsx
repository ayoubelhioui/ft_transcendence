import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import { Chat, HomePage, LeaderBoard, LiveMatches, MainWrapper, Navbar, Profile, ResultsLatestHome, UserInfo } from ".."
import Game from "../Game/Game"
import ChooseGame from "../Game/ChooseGame"
import { useAppServiceContext } from "../../Context/Context"
import { appService } from "../../Context/Service/AppDataService"
import { useEffect, useState, useRef } from "react"
import Modal from 'react-modal';

import { Avatar } from "@mui/material"

import { ImCross } from "react-icons/im"
import { address } from "../../Const"
import { UserI } from "../../Context/Service/AuthService"


Modal.setAppElement('#root');

// {/* <div className=" text-white flex items-center justify-center gap-4 mx-4 relative">
//           <Avatar alt="Avatar" src="" />
//           <div className="flex flex-col">
//             <h2>User's Name</h2>
//             <p className="pl-2">rgfsvwewedffds</p>
//           </div>
//           <ImCross size={15} onClick={onRequestClose} className="cursor-pointer absolute top-0 -right-[6.4rem] pt-[5px] w-[20px] h-[20px]"/>
          
//           {/* Add the line to represent the time the popup will appear */}
//           {/* <NavLink to="/Chat"> h </NavLink>
//           <div className="time-line w-full h-1 bg-gray-400" style={{ width: `${50}%` }}></div> */}
//           {/* <button onClick={onRequestClose} className=" absolute"> <ImCross size={15}/> </button> */}
//         </div> */}

const MESSAGE_EVENT = 0
const INVITE_EVENT = 1
const ERROR_EVENT = 2

//!popup setTime out 
//!popup clos
interface popupContentI {
  link? : string
  message : string
  iconLink? : string
  type : number
  payload : any
}

interface InviteI {
  username : string
  id : number
  intraId : number
  gameToken: string
  gameType : string
  isClassic : boolean
  isBotMode : boolean
}

interface MessageI {
  user : UserI
  message : string, 
  channelId : number,
}

interface ErrorI {
  message : string
}

const PopupContent = ({content, setIsOpen} : {content : popupContentI | undefined, setIsOpen: any}) => {
  const navigate = useNavigate()
  const appService = useAppServiceContext()

  const inviteClick = (payload : InviteI) => {
    appService.utilService.gameParams = {
      isWatchMode : false,
      isClassic : payload.isClassic,
      isBotMode : payload.isBotMode,
      userId : appService.authService.user?.id,
      canvas : undefined,
      gameToken : payload.gameToken,
    }
    setIsOpen(false)
    navigate('/Play')
  }

  const messageClick = (payload : MessageI) => {
    console.log("Message on click", payload)
    setIsOpen(false)
    navigate(`/Chat/${payload.channelId}`)
  }

  if (content) {
    if (content.type === ERROR_EVENT) {
      return <div className="flex mx-4 gap-8 items-center w-full text-white"> {content.message} </div>
    } else if (content.type === INVITE_EVENT) {
      console.log(content.payload)
      return (
        <div onClick={() => inviteClick(content.payload)} className="flex mx-4 gap-8 items-center w-full text-white">
          <Avatar alt="Avatar" src={content.iconLink} />
          <div> {content.message} </div>
        </div>
      )
    } else if (content.type === MESSAGE_EVENT) {
      return (
        <div onClick={() => messageClick(content.payload)} className="flex mx-4 gap-8 items-center w-full text-white">
          <Avatar alt="Avatar" src={content.iconLink} />
          <div> {content.message} </div>
        </div>
      )
    }
  }
  return <div></div>
}

const Popup = () => {
    const appService = useAppServiceContext() 
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<popupContentI | undefined>(undefined);
    const timeOutId = useRef<NodeJS.Timeout | undefined>(undefined)

    function onSetIsOpen(value : boolean) {
      setIsOpen(value)
      clearTimeout(timeOutId.current)
      if (value) {
        setTimeout(() => {
          console.log("Closing popup")
          setIsOpen(false)
        }, 5000)
      } else {
        clearTimeout(timeOutId.current)
      }
    }

    useEffect(() => {
        const messageEvent = "on_message_send"
        const inviteEvent = "invite_to_game"
        const errorEvent = "exception"
        
        appService.socketService.on(messageEvent, (data : MessageI) => {
          const newContent : popupContentI = {
            link : `/Chat/${data.channelId}`,
            message : `${data.message}`,
            iconLink : `http://${address}/users/image/${data.user.IntraId}`,
            type : MESSAGE_EVENT,
            payload : data,
          }

            setContent(newContent)
            onSetIsOpen(true)
        })

        appService.socketService.on(inviteEvent, (data : InviteI) => {
          const newContent : popupContentI = {
            link : data.gameToken,
            message : `${data.username} has invited you to ${data.gameType}`,
            iconLink : `http://${address}/users/image/${data.intraId}`,
            type : INVITE_EVENT,
            payload : data,
          }
          setContent(newContent)
          onSetIsOpen(true)
        })

        appService.socketService.on(errorEvent, (data : ErrorI) => {
          const newContent : popupContentI = {
            link : undefined,
            message : data.message,
            iconLink : undefined,
            type : ERROR_EVENT,
            payload : data,
          }
          setContent(newContent)
          onSetIsOpen(true)
        })
    
        return (() => {
          appService.socketService.off(messageEvent)
          appService.socketService.off(inviteEvent)
          appService.socketService.off(errorEvent)
        })
      }, [])

    const onRequestClose = () => {
        
        onSetIsOpen(false);
    };

    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        className="modal-content max-sm:top-[8%] max-sm:right-[5%] border-none outline-none bg-none"
        overlayClassName="modal-backdrop"
        shouldCloseOnOverlayClick={true}
      >
     

        <PopupContent content={content} setIsOpen={onSetIsOpen}/>
        <ImCross size={15} onClick={onRequestClose} className="cursor-pointer text-white ml-auto mr-1 pt-[5px] w-[20px] h-[20px]"/>
        
        
      </Modal>
    );
  };



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

                    <Route path='FriendsPlaying' element={<LiveMatches />}/>


                </Route>

            </Routes>
        </MainWrapper>
      )
}

export default MainPage