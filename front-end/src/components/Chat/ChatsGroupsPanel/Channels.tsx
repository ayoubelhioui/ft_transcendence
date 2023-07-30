import { useEffect, useRef } from "react"
import { useAppServiceContext } from "../../../Context/Context"
import { useChatContext } from "../ChatContext"
import { useChatsGroupsPanelContext } from "./ChatsGroupsPanelContext"
import ProtectedGroup from "./ProtectedGroup"
import PublicGroup from "./PublicGroup"

const Channels = () => {
  const appService = useAppServiceContext()
  const chatsGroupsPanelContext = useChatsGroupsPanelContext()
  const result = appService.requestService.getChannelsRequest([chatsGroupsPanelContext.updateListChannelsJoin])
  const isSearchingDone = useRef(true)
  let dataFiltered = useRef<Object[] | null>(null)

  /******** Filter List */
  useEffect(() => {
  }, [chatsGroupsPanelContext.commitSearch])

  useEffect(() => {
    const search = chatsGroupsPanelContext.chatSearch
    if (result.data && search.length > 0 && isSearchingDone.current) {
      isSearchingDone.current = false
      dataFiltered.current = [...result.data]
      dataFiltered.current = dataFiltered.current.filter((item : any) => {
        let name = item.name
        return name.toLowerCase().includes(search.toLowerCase())
      }
      );
      isSearchingDone.current = true
    } else if (result.data && search.length === 0) {
      dataFiltered.current = [...result.data]
    }
    chatsGroupsPanelContext.setCommitSearch(!chatsGroupsPanelContext.commitSearch)
  }, [chatsGroupsPanelContext.chatSearch, result.data])

  /**************************** */

  return (
    <div className="flex mt-3 flex-col h-[550px] scroll-smooth">
      <div className="flex flex-col overflow-y-scroll">
        <PublicGroup  result={result} list={dataFiltered.current}/>
        <ProtectedGroup result={result} list={dataFiltered.current}/>
      </div>
    </div>
  )
}

export default Channels
