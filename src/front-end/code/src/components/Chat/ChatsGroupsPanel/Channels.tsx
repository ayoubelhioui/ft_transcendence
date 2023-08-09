import { useEffect, useRef } from "react"
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext"
import { useChatContext } from "../ChatContext"
import { useChatsGroupsPanelContext } from "./ChatsGroupsPanelContext"
import ProtectedGroup from "./ProtectedGroup"
import PublicGroup from "./PublicGroup"
import { searchEffect } from "../../Utils/utils"

const Channels = () => {
  const appService = useAppServiceContext()
  const chatsGroupsPanelContext = useChatsGroupsPanelContext()
  const response = appService.requestService.getChannelsRequest()
  const result = response.state
  const search = searchEffect(result, (searchText : string, list : any[]) => {
    list = list.filter((item : any) => {
      let name = item.name
      return name.toLowerCase().includes(searchText.toLowerCase())
    });
    return (list)
  })

  response.effect([chatsGroupsPanelContext.updateListChannelsJoin])

  search.commitEffect()
  search.filterEffect([result.data])

  useEffect(() => {
    search.setSearch(chatsGroupsPanelContext.chatSearch)
  }, [chatsGroupsPanelContext.chatSearch])

  return (
    <div className="flex mt-3 flex-col h-[600px]">
      <div className="flex flex-col overflow-y-scroll relative">
        <PublicGroup  result={result} list={search.dataFiltered}/>
        <ProtectedGroup result={result} list={search.dataFiltered}/>
      </div>
    </div>
  )
}

export default Channels
