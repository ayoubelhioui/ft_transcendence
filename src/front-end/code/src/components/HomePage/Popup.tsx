import { Avatar } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import Modal from 'react-modal';
import { ImCross } from "react-icons/im"
import { address } from "../../Const"
import { UserI } from "../../Context/Service/AuthService"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";

Modal.setAppElement('#root');


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
    //console.log("Message on click", payload)
    setIsOpen(false)
    navigate(`/Chat/${payload.channelId}`)
  }

  if (content) {
    if (content.type === ERROR_EVENT) {
      return <div className="flex mx-4 gap-8 items-center w-full text-white"> {content.message} </div>
    } else if (content.type === INVITE_EVENT) {
      //console.log(content.payload)
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
          //console.log("Closing popup")
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
            iconLink : `http://${address}/users/image/${data.user.id}`,
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
            iconLink : `http://${address}/users/image/${data.id}`,
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
      <>

{/* <PopupContent content={content} setIsOpen={onSetIsOpen}/> */}
        

<div className="absolute z-[999] right-0 mt-5 mr-1"> 
  <div id="toast-success" className="flex flex-col items-center w-full max-w-xs p-4 mb-4 text-white bg-[#282f729e] rounded-lg" role="alert">
   
      
    <div className="flex">
      <Avatar alt="Avatar" src={`http://${address}/users/image/2`} />
      <div className="break-words ml-3 text-sm font-normal overflow-wrap w-[200px]">Item movedsuccessfullysuccessfullysuccessfullymovedsuccessfullysuccessfullysuccessfully successfully Item moved successfully Item moved successfully Item moved successfully successfully successfully successfullysuccessfully successfully.</div>
      <button type="button" onClick={onRequestClose} className="ml-auto -mx-1.5 -my-1.5 text-white hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
    </div>

    <div className="w-full mt-4 back rounded-full h-2.5 dark:bg-gray-700">
      <div className="bg-blue-600 h-2.5 rounded-full w-[10%]" ></div>
    </div>
  </div>
</div>



      </>
    )


    
};


export {
  Popup
}