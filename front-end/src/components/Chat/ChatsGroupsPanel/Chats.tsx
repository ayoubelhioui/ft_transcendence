import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode, useEffect, useState} from "react";
import { useAppServiceContext } from "../../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";
import { useChatContext } from "../ChatContext";
import { RequestResultI } from "../../../Context/Service/RequestService";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
      <div className="text-white flex flex-col overflow-y-scroll scroll-smooth">
          {children}
      </div>
    )
}


const LastMessage = ({message} : {message : any | undefined}) => {
  if (message) {
    let item = message.message
    if (item.length > 5)
      item = item.slice(0, 5) + " ..."
    return <p className='pt-1 pl-2 text-gray-600'>{item}</p>
  }
  return <p className='pt-1 pl-2 text-gray-600'></p>
}

const Item = ({payload, onItemClick} : {payload : any, onItemClick : any}) => {
  const channel = payload
  const avatar = `http://${address}/users/image/${channel.avatar}`
  
  function itemClick() {
    onItemClick(payload.id, payload.name)
  }

  //! render last message if exist
  return (
    <div className="flex mt-8 items-center mx-6" onClick={itemClick}>
        <img src={avatar} alt='avatar' className=' object-cover rounded-full w-[65px] h-[65px] cursor-pointer'/>
        <div className="flex flex-col ml-6 cursor-pointer">
          <h2 className='text-white'>{channel.name}</h2>
          <LastMessage message={channel.lastMessage} />
        </div>
    </div>
  )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mt-[50%] text-white text-2xl justify-center items-center"> No Messages Yet! </div>
        </Wrapper>
    )
}


const List = ({list} : {list : any}) => {
  const chatService = useChatContext()

  function onItemClick(id : number, name : string) {
    chatService.setConversationInfo({
      id,
      name
    })
  }


  list = list.sort((a: any, b: any) => {
    let timeA = a.lastMessage ? a.lastMessage.time : a.creationTime
    let timeB = b.lastMessage ? b.lastMessage.time : b.creationTime
    timeA = new Date(timeA).getTime()
    timeB = new Date(timeB).getTime()
    return -(timeA - timeB)
  })

  if (list[0] && !chatService.conversationInfo.id) {
    chatService.setConversationInfo({
      id : list[0].id,
      name : list[0].name
    })
  }

  return (
    <Wrapper>
        {
            list.map((item : any) => (            
                <Item key={item.id} payload={item} onItemClick={onItemClick}/>
            ))
        }
    </Wrapper>
    
  )
}

const Chats = () => {
    const appService = useAppServiceContext()
    const chatContext = useChatContext()
    const result = appService.requestService.getMyChannelsRequest([chatContext.updateChats])
   
    if (result.status === STATUS_UNDEFINED) {
      return <div>Loading ...</div>
    } else if (result.status === STATUS_ERROR) {
      return (
        <>
        <div> Popup Error </div>
        <NoContent></NoContent>
        </>
      )
    } else if (result.status === STATUS_SUCCESS) {
        if (result.data.length === 0) {
            return <NoContent></NoContent>
        } else {
            return <List list={result.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }

}

export default Chats