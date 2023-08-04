import { createContext, useContext, useState } from "react";

//context interface
export interface ChatsGroupsPanelContextI {
  chatSearch : string
  setChatSearch : React.Dispatch<React.SetStateAction<string>>
  commitSearch : boolean
  setCommitSearch : React.Dispatch<React.SetStateAction<boolean>>
  updateListChannelsJoin : boolean
  setUpdateListChannelsJoin : React.Dispatch<React.SetStateAction<boolean>>
}

//create context
const ChatsGroupsPanelContext = createContext<ChatsGroupsPanelContextI | undefined>(undefined);

//use context
function useChatsGroupsPanelContext() {

    const context = useContext(ChatsGroupsPanelContext)

    if (!context) {
        throw new Error("useChatsGroupsPanelContext not defined");
    }

    return (context)
}

//provider
function ChatsGroupsPanelContextProvider({ children } : {children : any}) {
  const [chatSearch, setChatSearch] = useState('')
  const [commitSearch, setCommitSearch] = useState(false)
  const [updateListChannelsJoin, setUpdateListChannelsJoin] = useState(false)

  const contextValue : ChatsGroupsPanelContextI = {
    chatSearch,
    setChatSearch,
    commitSearch,
    setCommitSearch,
    updateListChannelsJoin,
    setUpdateListChannelsJoin,
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