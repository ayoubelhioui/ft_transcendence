import { useChatContext } from "../ChatContext";
import ConversationsChat from "./ConversationChat";
import ChatFooter from "./Footer";
import Header from "./Header";




const Conversations = () => {
  const chatContext = useChatContext()
  const id = chatContext.conversationInfo.id
  const name = chatContext.conversationInfo.name

  return (
    <div className="flex flex-col justify-between max-m-custom-md:w-[100%] top_2 col-span-2 max-m-custom-md:col-span-1 h-[850px] max-m-custom-md:h-[900px] max-custom-lg:h-[800px] row-span-2 ">
      { 
      
      id != undefined ? (
        <>
          <Header name={name} />
          <ConversationsChat id={id} />
          <ChatFooter />
        </>
      ) : (
        <div className="flex mx-auto h-screen w-full justify-center items-center text-3xl text-white"> There Is No Conversation ! </div>
      )
      
      }
    </div>
  )
}

export default Conversations;
