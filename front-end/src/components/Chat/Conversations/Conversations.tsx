import { useChatContext } from "../ChatContext";
import ConversationsChat from "./ConversationChat";
import ChatFooter from "./Footer";
import Header from "./Header";


const Conversations = () => {
  const chatContext = useChatContext()
  const id = chatContext.conversationInfo.id
  const name = chatContext.conversationInfo.name

  return (
    <div className="flex flex-col justify-between max-m-custom-md:w-[100%] top_2 col-span-2 max-m-custom-md:col-span-1 h-[60vh] max-m-custom-md:h-full row-span-2 ">
      { 
      
      id != undefined ? (
        <>
          <Header name={name} />
          <ConversationsChat id={id} />
          <ChatFooter />
        </>
      ) : (
        <div> No Conversation ! </div>
      )
      
      }
    </div>
  )
}

export default Conversations;
