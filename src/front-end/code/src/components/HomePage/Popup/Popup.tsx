import { useEffect, useState, useRef } from "react"
import Modal from 'react-modal';
import { address } from "../../../Const"
import { UserI } from "../../../Context/Service/AuthService"
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";
import { PopupContent } from "./PopupContent";
import { Triggers } from "../../../Context/Service/UtilService";

Modal.setAppElement('#root');

export enum POPUP_EVENT {
  MESSAGE_EVENT = 0,
  INVITE_EVENT = 1,
  ERROR_EVENT = 2,
  STATUS_EVENT = 3,
}

export interface popupContentI {
  link? : string
  message : string
  iconLink? : string
  type : number
  payload : any
  title : string
}

export interface InviteI {
  username : string
  id : number
  gameToken: string
  gameType : string
  isClassic : boolean
  isBotMode : boolean
}

export interface MessageI {
  user : UserI
  message : string, 
  channelId : number,
}

export interface ErrorI {
  message : string
}

const PopupTimeOut = ({onRequestClose, progress} : {onRequestClose : any, progress : React.MutableRefObject<number>}) => {
  const ref = useRef<HTMLDivElement>(null)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {

    intervalId.current = setInterval(() => {
      const duration = 5
      const step = (100 / (60 * duration))
      const prog = progress.current
      const newProgress = prog - step
      progress.current -= step
      if (newProgress <= 0) {
        // console.log("End Progress")
        onRequestClose()
        clearInterval(intervalId.current!)
      } else {
        if (ref.current) {
          ref.current.style.width = `${prog}%`
          // console.log("Progress", ref.current.style.width)
        }
      }
    }, 1000 / 60)
    

  }, [])

  return <div ref={ref} className={`bg-blue-600 h-1 rounded-full`} ></div>
}

let openPopupError : (error : string) => void = (error : string) => {
  console.log(error)
}

let openPopupStatus : (status : string) => void = (status : string) => {
  console.log(status)
}

const Popup = () => {
    const appService = useAppServiceContext() 
    const [isOpen, setIsOpen] = useState(false);
    const openFlag = useRef(false)
    const [content, setContent] = useState<popupContentI | undefined>(undefined);
    //const showPopUpTrigger = appService.utilService.addTrigger(Triggers.ShowPopUp)
    const progress = useRef(100)

    // useEffect(() => {
    //   onSetIsOpen(true)
    // }, [showPopUpTrigger])

    openPopupError = (error : string) => {
      console.log("Open Notification ... with", error, openFlag.current)
      const newContent : popupContentI = {
        message : error,
        type : POPUP_EVENT.ERROR_EVENT,
        payload : undefined,
        title : "Error"
      }
      setContent(newContent)
      onSetIsOpen(true)
    }

    openPopupStatus = (status : string) => {
      const newContent : popupContentI = {
        message : status,
        type : POPUP_EVENT.STATUS_EVENT,
        payload : undefined,
        title : "System"
      }
      setContent(newContent)
      onSetIsOpen(true)
    }


    function onSetIsOpen(value : boolean) {
      if (value === true) {
        progress.current = 100
        setIsOpen(true)
        openFlag.current = true
      }
      else {
        if (content && openFlag.current !== value) {
          if (content.type === POPUP_EVENT.INVITE_EVENT) {
            console.log("Store ", content)
            appService.socketService.addNotificationFromPopUp(content)
          }
        }
        setContent(undefined)
        setIsOpen(false)
        openFlag.current = false
      }
    }

    function isChat() {
      const currentURI = window.location.pathname;
      const isChat = currentURI.split('/').find((item : string) => item === "Chat")
      //console.log(currentURI.split('/'), isChat !== undefined)
      return isChat !== undefined
    }

    function isGame() {
      const currentURI = window.location.pathname;
      const isChat = currentURI.split('/').find((item : string) => item === "Play")
      return isChat !== undefined
    }

    const messageEventHandler = (data : MessageI) => {
      if (isChat() || isGame())
        return

      const newContent : popupContentI = {
        link : `/Chat/${data.channelId}`,
        message : `${data.message}`,
        iconLink : `http://${address}/users/image/${data.user.id}`,
        type : POPUP_EVENT.MESSAGE_EVENT,
        payload : data,
        title : `${data.user.username} has a message for you!`
      }
      

      setContent(newContent)
      onSetIsOpen(true)
    }

    const inviteToGameEventHandler = (data : InviteI) => {
      if (isGame())
        return
      let gameTitle = `${data.username} invites you to a thrilling 3D gaming session!`
      if (data.isClassic)
        gameTitle = `${data.username} invites you to a classic 2D game!`
      const newContent : popupContentI = {
        link : data.gameToken,
        message : `${data.username} has invited you to ${data.gameType}`,
        iconLink : `http://${address}/users/image/${data.id}`,
        type : POPUP_EVENT.INVITE_EVENT,
        payload : data,
        title : gameTitle
      }
      setContent(newContent)
      onSetIsOpen(true)
    }

    const errorEventHandler = (data : ErrorI) => {
      const newContent : popupContentI = {
        link : undefined,
        message : data.message,
        iconLink : undefined,
        type : POPUP_EVENT.ERROR_EVENT,
        payload : data,
        title : "Error"
      }
      setContent(newContent)
      onSetIsOpen(true)
    }

    useEffect(() => {
        const messageEvent = "on_message_send"
        const inviteEvent = "invite_to_game"
        const errorEvent = "exception"
        
        appService.socketService.on(messageEvent, messageEventHandler)
        appService.socketService.on(inviteEvent, inviteToGameEventHandler)
        appService.socketService.on(errorEvent, errorEventHandler)
    
        return (() => {
          appService.socketService.off(messageEvent, messageEventHandler)
          appService.socketService.off(inviteEvent, inviteToGameEventHandler)
          appService.socketService.off(errorEvent, errorEventHandler)
        })

      }, [])

    const onRequestClose = () => {
      onSetIsOpen(false);
    };

    if (!isOpen)
      return <div></div>

    return (
      <>

      <div className="absolute z-[10000] right-0 mt-5 mr-1"> 
        <div id="toast-success" className="flex flex-col items-center w-full max-w-xs p-4 mb-4 text-white bg-[#282f729e] rounded-lg" role="alert">
        
            
            
          <div className="flex">
            <PopupContent content={content} setIsOpen={onSetIsOpen}/>
            <button type="button" onClick={onRequestClose} className="ml-auto -mx-1.5 -my-1.5 text-white hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
          </div>

          <div className="w-full mt-4 back rounded-full h-1 dark:bg-gray-700">
            <PopupTimeOut onRequestClose={onRequestClose} progress={progress} />
          </div>
        </div>
      </div>

      </>
    )
    
};


export {
  Popup,
  openPopupError,
  openPopupStatus
}