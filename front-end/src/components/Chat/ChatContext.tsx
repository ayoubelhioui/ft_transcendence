import { createContext, useContext, useRef, useState } from "react";

export interface ConversationInfoI {
  id : number | undefined,
  name : string,
  isGroup : boolean,
  avatar? : string
}

//context interface
export interface ChatContextI {
  conversationInfo : ConversationInfoI
  setConversationInfo : React.Dispatch<React.SetStateAction<ConversationInfoI> >
  updateChats : boolean
  setUpdateChats : React.Dispatch<React.SetStateAction<boolean> >
  conversationId : number | undefined
}

//create context
const ChatContext = createContext<ChatContextI | undefined>(undefined);

//use context
function useChatContext() {

    const context = useContext(ChatContext)

    if (context === undefined) {
        throw new Error("Chat context not defined");
    }

    return (context)
}

//provider
function ChatContextProvider({ children, chatId } : {children : any, chatId : number | undefined}) {
  const conversationId = chatId
  const [conversationInfo, setConversationInfo] = useState<ConversationInfoI>({
    id : undefined,
    name : '',
    isGroup : false
  });

  const [updateChats, setUpdateChats] = useState(false)

  const contextValue : ChatContextI = {
    conversationInfo,
    setConversationInfo,
    updateChats,
    setUpdateChats,
    conversationId
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export {
    useChatContext,
    ChatContextProvider
}