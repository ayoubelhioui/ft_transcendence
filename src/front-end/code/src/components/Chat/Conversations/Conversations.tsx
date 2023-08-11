import { useEffect } from "react";
import { useChatContext } from "../ChatContext";
import ConversationsChat from "./ConversationChat";
import ChatFooter from "./Footer";
import Header from "./Header";
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";


const NoContent = () => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()

  useEffect(() => {
    const event = "on_message_send"
    const handler = () => {
      chatContext.setUpdateChats(!chatContext.updateChats)
    }

    appService.socketService.on(event, handler)

    return (() => {
      appService.socketService.off(event, handler)
    })
  }, [])

  return (
    <div className="flex mx-auto h-screen w-full justify-center items-center text-3xl text-gray-400"> There Is No Conversation ! </div>
  )
}

const Conversations = () => {
  const chatContext = useChatContext()
  const id = chatContext.conversationInfo.id

  return (
    <div className="flex flex-col justify-between max-m-custom-md:w-[100%] top_2 col-span-2 max-m-custom-md:col-span-2 h-[850px] max-m-custom-md:h-[670px] max-custom-lg:h-[800px] row-span-2 max-custom-md:mt-2">
      { 
      
      id != undefined ? (
        <>
          <Header conversationInfo={chatContext.conversationInfo} />
          <ConversationsChat id={id} />
          <ChatFooter />
        </>
      ) : (
        <NoContent />
      )
      
      }
    </div>
  )
}

export default Conversations;
