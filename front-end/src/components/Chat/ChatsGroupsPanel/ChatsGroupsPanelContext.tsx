import { createContext, useContext, useState } from "react";

export interface ConversationInfoI {
  id : number | undefined,
  name : string,
  isGroup : boolean
}

//context interface
export interface ChatsGroupsPanelContextI {
  conversationInfo : ConversationInfoI
  setConversationInfo : React.Dispatch<React.SetStateAction<ConversationInfoI> >
  updateChats : boolean
  setUpdateChats : React.Dispatch<React.SetStateAction<boolean> >
}

//create context
const ChatsGroupsPanelContext = createContext<ChatsGroupsPanelContextI | undefined>(undefined);

//use context
function useChatsGroupsPanelContext() {

    const context = useContext(ChatsGroupsPanelContext)

    if (context === undefined) {
        throw new Error("Chat context not defined");
    }

    return (context)
}

//provider
function ChatsGroupsPanelContextProvider({ children } : {children : any}) {
  const [conversationInfo, setConversationInfo] = useState<ConversationInfoI>({
    id : undefined,
    name : '',
    isGroup : false
  });

  const [updateChats, setUpdateChats] = useState(false)

  const contextValue : ChatsGroupsPanelContextI = {
    conversationInfo,
    setConversationInfo,
    updateChats,
    setUpdateChats
  }

  return (
    <ChatsGroupsPanelContext.Provider value={contextValue}>
      {children}
    </ChatsGroupsPanelContext.Provider>
  );
};

export {
    useChatsGroupsPanelContext,
    ChatsGroupsPanelContextProvider
}