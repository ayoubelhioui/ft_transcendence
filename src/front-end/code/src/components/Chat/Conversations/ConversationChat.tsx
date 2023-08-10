import { ReactNode, useState, useEffect, useRef} from "react";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";
import { useChatContext } from "../ChatContext";

interface ListI {
  id : number
  message : string
  time : string
  seen : boolean
  user : any
}

interface MessageListI {
  doneFetching : boolean
  id : number
  list : ListI[]
  scrollPosition : number
}


const Sender = ({message} : {message : any}) => {
  return (
    <div className="flex flex-col pt-4">
      <span className="text-white opacity-60 text-sm text-right pr-2 gap-1">
        You
      </span>
      <div className="h-min text-lg text-white back max-w-[200px] p-[10px] rounded-[10px] ml-auto">
        <p className=" break-words">{message.message}</p>
      </div>
    </div>
  );
};

const Receiver = ({message} : {message : any}) => {
  return (
    <div className="flex flex-col pt-4">
      <span className="text-white opacity-60 text-sm text-left pl-2 gap-1">
        {message.user.username}
      </span>
      <div className="text-lg text-white back max-w-[200px] h-min p-[10px] rounded-[10px]">
        <p className=" break-words">
        {message.message}
        </p>
      </div>
    </div>
  );
};


const Item = ({payload, isSender} : {payload : any, isSender : boolean}) => {
  const message = payload

  if (isSender) {
    return (<Sender message={message}/>)
  } else {
    return (<Receiver message={message}/>)
  }
}

const ConversationsChat = ({id} : {id : number}) => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const userId = appService.authService.user!.id
  const [refreshTrigger, setRefreshTrigger] = useState(true)
  const lists = useRef<MessageListI[]>([])
  const listRef = useRef<HTMLDivElement | null>(null);

  const getItem = (id : number) => {
    return lists.current[id]
  }

  const getOldestMessageDate = () => {
    const list = getItem(id).list
    return list.length === 0 ? undefined : list[list.length - 1].time
  }

  const updateList = (newItems : any, isNew : boolean, channelId : number) => {
    const item = getItem(channelId)
    if (item) {
      if (isNew) {
        item.list = [...newItems, ...item.list]
      } else {
        item.list = [...item.list, ...newItems]
      }
      setRefreshTrigger(!refreshTrigger)
    }
  }

  const requestData = async () => {
    const oldestMessageDate = getOldestMessageDate()
    // //console.log("next request: ", oldestMessageDate)
    const result = await appService.requestService.getChannelMessagesRequest(id, oldestMessageDate)
    if (result.status === STATUS_SUCCESS) {
      if (result.data.length === 0) {
        getItem(id).doneFetching = true
      } else {
        updateList(result.data, false, id)
      }
    } else {
      //!handle Error
    }
  }

  const handleObserver = async (entries : any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (listRef.current) {
        if (!getItem(id)) {
          const newItem : MessageListI = {
            doneFetching : false,
            id : id,
            list : [],
            scrollPosition : 0
          }
          lists.current[id] = newItem
        }
        getItem(id).scrollPosition = listRef.current.scrollTop
        if (!getItem(id).doneFetching) {
          await requestData()
        }
        listRef.current.scrollTop = getItem(id).scrollPosition;
      }
    }
  };


  const updateChat = () => {
    chatContext.setUpdateChats(!chatContext.updateChats)
  }

  useEffect(() => {
    const event = "on_message_send"
    const handler = (data : any) => {
      updateList([data], true, data.channelId)
      updateChat()
    }

    appService.socketService.on(event, handler)

    return (() => {
      appService.socketService.off(event, handler)
    })
  }, [refreshTrigger, id, chatContext.updateChats])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    const loadMoreElement = document.getElementById('load-more');
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      observer.disconnect()
    };
  }, [refreshTrigger, id]);

  if (getItem(id)) {
    return (
        <div ref={listRef} className="w-full h-full px-4 mt-8 overflow-y-scroll flex flex-col-reverse">
          {
              getItem(id).list.map((item : any, index : number) => (            
                  <Item 
                    key={index} 
                    payload={item} 
                    isSender={item.user.id === userId} 
                  />
              ))
          }
          
          <div id="load-more" className="h-10 w-10 bg-transparent"> 
              <span className=" text-transparent">s</span>
          </div>
        </div>
    )
  } else {
    return (
      <div ref={listRef} className="w-full h-full px-4 mt-8 overflow-y-scroll flex flex-col-reverse">
        <div id="load-more" className="h-10 w-10"> 
          <Sender message={"Limiter"}/>
        </div>
      </div>
    )
  }
}

export default ConversationsChat
