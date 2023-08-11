import { useNavigate } from "react-router-dom"
import { InviteI, MessageI, POPUP_EVENT, popupContentI } from "./Popup"
import { Avatar } from "@mui/material"
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext"


const PopupItem = ({content} : {content : popupContentI}) => {

  let message = content.message.substring(0, 150)
  if (content.message.length > 150)
    message = message + " ..."

  return (
    <div className="flex cursor-pointer">
    <Avatar alt="Avatar" src={content.iconLink} />
    <div className="break-words ml-3 text-sm font-normal overflow-wrap w-[200px]">
      <h5 className="font-bold">{content.title}</h5>
      <div className="ml-2 mt-1">{message}</div>
    </div>
    </div>
  )
}

const Message = ({content, setIsOpen} : {content : popupContentI , setIsOpen: any}) => {
  const navigate = useNavigate()

  const messageClick = (payload : MessageI) => {

    setIsOpen(false)
    navigate(`/Chat/${payload.channelId}`)
  }

  return (
      <div onClick={() => messageClick(content.payload)}>
        <PopupItem content={content} />
      </div>
  )
}

const Invite = ({content, setIsOpen} : {content : popupContentI , setIsOpen: any}) => {
  const navigate = useNavigate()
  const appService = useAppServiceContext()

  const inviteClick = (payload : InviteI) => {
    appService.utilService.gameParams = {
      isClassic : payload.isClassic,
      isBotMode : payload.isBotMode,
      gameToken : payload.gameToken,
    }
    setIsOpen(false)
    navigate('/Play')
  }

  return (
    <div onClick={() => inviteClick(content.payload)}>
      <PopupItem content={content} />
    </div>
  )
}

const Error = ({content} : {content : popupContentI}) => {
  return (
    <div className="flex cursor-pointer">
      <div className="break-words ml-3 text-sm font-normal overflow-wrap w-[200px]">
        <h5 className="font-bold text-[#f74e4e]">{content.title}</h5>
        <div className="ml-2 mt-1">{content.message}</div>
      </div>
    </div>
  )
}

const Status = ({content} : {content : popupContentI}) => {
  return (
    <div className="flex cursor-pointer">
      <div className="break-words ml-3 text-sm font-normal overflow-wrap w-[200px]">
        <h5 className="font-bold text-[#6ce989]">{content.title}</h5>
        <div className="ml-2 mt-1">{content.message}</div>
      </div>
    </div>
  )
}

const PopupContent = ({content, setIsOpen} : {content : popupContentI | undefined, setIsOpen: any}) => {

  if (content) {

    if (content.type === POPUP_EVENT.STATUS_EVENT) {
      return <Status content={content}/>
    }

    if (content.type === POPUP_EVENT.ERROR_EVENT) {
      return <Error content={content}/>
    }
    
    if (content.type === POPUP_EVENT.INVITE_EVENT) {
      return <Invite content={content} setIsOpen={setIsOpen}/>
    }
    
    if (content.type === POPUP_EVENT.MESSAGE_EVENT) {
      return <Message content={content} setIsOpen={setIsOpen}/>
    }
  }
  return <div></div>
}

export {
  PopupContent
}