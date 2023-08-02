import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode, useEffect, useRef, useState} from "react";
import { useAppServiceContext } from "../../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";
import { useChatContext } from "../ChatContext";
import { RequestResultI } from "../../../Context/Service/RequestService";
import { useChatsGroupsPanelContext } from "./ChatsGroupsPanelContext";
import { searchEffect } from "../../Utils/utils";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
      <div className="text-white flex flex-col h-[580px] overflow-y-scroll">
          {children}
      </div>
    )
}


const LastMessage = ({message} : {message : any | undefined}) => {
  if (message) {
    let item = message.message
    if (item.length > 5)
      item = item.slice(0, 5) + " ..."
    return <p className='pt-1 pl-2 text-gray-400'>{item}</p>
  }
  return <p className='pt-1 pl-2 text-gray-400'></p>
}

const Item = ({payload} : {payload : any}) => {
  const chatService = useChatContext()
  const navigate = useNavigate();
  const channel = payload
  let avatar = `http://${address}/users/image/${channel.avatar}`
  let groupIcon = ""
  
  const imageOnClick = () => {
    //!get the id of the user
    const id = 1
    if (!payload.isGroup) {
      navigate(`/Profile/${id}`)
    }
  }

  if (!payload.isGroup){
    avatar = `http://${address}/users/image/-2`
  }

  if (payload.isGroup) {
    let map = new Map<string, string>()
    map.set("public", "")
    map.set("private", "")
    map.set("protected", "")
    if (map.has(payload.visibility))
      groupIcon = map.get(payload.visibility)!
    //!render the icon
  }

  function onItemClick() {
    navigate(`/Chat/${payload.id}`)

    // if (payload.isGroup) {
    //   console.log(payload.id)
    //   //! turn off channel info
    // }
  }

  return (
    <>
      <div className="flex my-4 items-center mx-6 gap-4" onClick={onItemClick}>
          <img onClick={imageOnClick} src={avatar} alt='avatar' className=' object-cover rounded-full w-[50px] h-[50px] cursor-pointer'/>
          <div className="flex flex-col cursor-pointer">
            <h2 className='text-white'>{channel.name}</h2>
            <LastMessage message={channel.lastMessage} />
          </div>
      </div>
      <span className="flex w-[100%] bg-gray-400 opacity-50 border-[.1px]"></span>
    </>

  )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mt-[50%] text-gray-400 text-2xl justify-center items-center"> No Messages Yet! </div>
        </Wrapper>
    )
}


const List = ({list} : {list : any}) => {
  const chatService = useChatContext()

  list = list.sort((a: any, b: any) => {
    let timeA = a.lastMessage ? a.lastMessage.time : a.creationTime
    let timeB = b.lastMessage ? b.lastMessage.time : b.creationTime
    timeA = new Date(timeA).getTime()
    timeB = new Date(timeB).getTime()
    return -(timeA - timeB)
  })

  useEffect(() => {
    // console.log(list)
    if (list[0] && !chatService.conversationInfo.id) {
      chatService.setConversationInfo({
        id : list[0].id,
        name : list[0].name,
        isGroup : list[0].isGroup,
      })
    }
  }, [])

  return (
    <Wrapper>
        {
            list.map((item : any) => (            
                <Item key={item.id} payload={item}/>
            ))
        }
    </Wrapper>
    
  )
}

const Chats = () => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const chatsGroupsPanelContext = useChatsGroupsPanelContext()
  const response = appService.requestService.getMyChannelsRequest()
  const result = response.state
  const search = searchEffect(result, (searchText : string, list : any[]) => {
    list = list.filter((item : any) => {
      let name = item.name
      return name.toLowerCase().includes(searchText.toLowerCase())
    });
    return (list)
  })

  //************************************************ */
  //**** redirect to the chat with the id in the url if it specified it
  //**   && if the id exists in the original list
  if (result?.data) {
    const targetId = chatContext.conversationId
    const isItemExist : any = result.data.find((item : any) => item.id === targetId)
    //console.log("Trying to Redirect to ", targetId, isItemExist)
    if (isItemExist && targetId !== chatContext.conversationInfo.id) {
      chatContext.setConversationInfo({
        id : isItemExist.id,
        name : isItemExist.name,
        isGroup : isItemExist.isGroup
      })
    }
  }
  //************************************************ */

  response.effect([chatContext.updateChats])
  search.commitEffect()
  search.filterEffect([result.data])

  useEffect(() => {
    search.setSearch(chatsGroupsPanelContext.chatSearch)
  }, [chatsGroupsPanelContext.chatSearch])

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
      if (!search.dataFiltered || search.dataFiltered.length === 0) {
          return <NoContent></NoContent>
      } else {
          return <List list={search.dataFiltered}></List>
      }
  } else {
      throw Error("Unhandled status")
  }

}

export default Chats