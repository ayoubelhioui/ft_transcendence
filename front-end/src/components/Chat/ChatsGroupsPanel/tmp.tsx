const Chats = () => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const result = appService.requestService.getMyChannelsRequest([chatContext.updateChats])
  const chatsGroupsPanelContext = useChatsGroupsPanelContext()
  let [dataFiltered, setDataFiltered] = useState<Object[] | null>(null)

  useEffect(() => {
    console.log(result, dataFiltered)
    const search = chatsGroupsPanelContext.chatSearch
    if (result.data && search.length > 0) {
      let arr = [...result.data]
      arr = arr.filter((item : any) => {
        let name = item.name
        return name.toLowerCase().includes(search.toLowerCase())
      }
      );
      setDataFiltered(arr)
    } else if (result.data && search.length === 0) {
      let arr = [...result.data]
      setDataFiltered(arr)
    }
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
      if (!dataFiltered || dataFiltered.length === 0) {
          return <NoContent></NoContent>
      } else {
          return <List list={dataFiltered}></List>
      }
  } else {
      throw Error("Unhandled status")
  }

}

export default Chats