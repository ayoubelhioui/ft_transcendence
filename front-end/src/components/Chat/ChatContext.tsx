import { createContext, useContext, useState } from "react";

interface ConversationInfoI {
  id : number | undefined,
  name : string
}

//context interface
export interface ChatContextI {
  conversationInfo : ConversationInfoI
  setConversationInfo : React.Dispatch<React.SetStateAction<ConversationInfoI> >
  updateChats : boolean
  setUpdateChats : React.Dispatch<React.SetStateAction<boolean> >
  updateChannelInfo : boolean
  setUpdateChannelInfo : React.Dispatch<React.SetStateAction<boolean> >
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
function ChatContextProvider({ children } : {children : any}) {
  const [conversationInfo, setConversationInfo] = useState<ConversationInfoI>({
    id : undefined,
    name : ''
  });

  const [updateChats, setUpdateChats] = useState(false)
  const [updateChannelInfo, setUpdateChannelInfo] = useState(false)

  const contextValue : ChatContextI = {
    conversationInfo,
    setConversationInfo,
    updateChats,
    setUpdateChats,
    updateChannelInfo,
    setUpdateChannelInfo
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