import { ReactNode, useState, useEffect, useRef} from "react";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";
import { useAppServiceContext } from "../../../Context/Context";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdSend } from 'react-icons/md'
import { useChatContext } from "../ChatContext";


const Header = ({name} : {name : string}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex justify-between mx-6 mt-3 items-center pt-2">
      <div className="flex flex-col items-center mx-auto ">
        {/* <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[55px] h-[55px]'/> */}
        <h2 className="text-sm text-white w-full text-center">
          {name}
        </h2>
      </div>
      <div className="flex flex-col relative">
        <BsThreeDotsVertical
          size={20}
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[3rem] items-center -left-[8rem] w-[150px] h-[160px] justify-center text-white z-[999]">
            {/* I need to check if the user is an admin, and if he is then i will have to display block and mute and add */}

            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Add a Friend
            </span>
            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Block a Friend
            </span>
            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Mute a Friend
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const ChatFooter = () => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const [message, setMessage] = useState("")
  function handleMessageChange(event: React.ChangeEvent<HTMLInputElement>){
     setMessage(event.target.value)
  }

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    appService.socketService.emitEvent("send_message", {
      message : message,
      channelId : chatContext.conversationInfo.id
    })
    setMessage("")
  };

  return (
    <div className="flex items-center">
      <form className="flex items-center w-full" onSubmit={handleMessage}>
        <input
          name="message"
          type="text"
          className=" inp border-0 text-white shadow w-[90%]"
          placeholder="Send A Message..."
          value={message}
          onChange={handleMessageChange}
        />

        <button type="submit" className=" outline-none p-0">
          <MdSend size={25} className=" text-gray-400" />
        </button>
      </form>
    </div>
  );
};

const Sender = ({message} : {message : any}) => {
  return (
    <div className="flex flex-col">
      <span className="text-white opacity-60 text-sm text-right pr-4 gap-1">
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
    <div className="flex flex-col gap-1">
      <span className="text-white opacity-60 text-sm text-left pl-4">
        {message.user.username}
      </span>
      <div className="text-lg text-white back max-w-[200px] h-min p-[10px] rounded-[10px] overflow-y-scroll">
        <p className=" break-words">
        {message.message}
        </p>
      </div>
    </div>
  );
};

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
  return (
      <div>
        {children}
      </div>
  )
}

const Item = ({payload, isSender} : {payload : any, isSender : boolean}) => {
  const message = payload

  if (isSender) {
    return (<Sender message={message}/>)
  } else {
    return (<Receiver message={message}/>)
  }
}

const NoContent = () => {
  return (
      <Wrapper>
          <div className="flex mx-auto py-2 "> No Chat </div>
      </Wrapper>
  )
}

const List = ({userId, data} : {userId : number, data : any}) => {
  const appService = useAppServiceContext()
  const [list, setList] = useState<Object[]>(data)
  const listRef = useRef<HTMLDivElement | null>(null);
  const prevScrollY = useRef(0);

  function requestData() {
    // const lastMessageTime
    // const result = appService.requestService.getChannelMessagesRequest(channelId, undefined)
  }

  function fetchData() {
    if (listRef.current) {
      prevScrollY.current = listRef.current.scrollTop;
      if (list.length < 1000)
        setList([... list, ... list])
      listRef.current.scrollTop = prevScrollY.current;
    }
  }

  const handleObserver = (entries : any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetchData();
    }
  };

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
  }, [list]);


  return (
      <div ref={listRef} className="w-full h-full px-4 mt-8 overflow-y-scroll flex flex-col-reverse">
        {
            list.reverse().map((item : any, index : number) => (            
                <Item 
                  key={index} 
                  payload={item} 
                  isSender={item.user.id === userId} 
                />
            ))
        }
        
        <div id="load-more" className="h-10 w-10 bg-red-500"> 
          <Sender message={"Limiter"}/>
        </div>
      </div>
  )
}

const ConversationsChat = ({id} : {id : number}) => {
  const appService = useAppServiceContext()
  const userId = appService.authService.user!.id
  const result = appService.requestService.getChannelMessagesRequest(id, undefined)

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
      if (result.data.length === 0) {
          return <NoContent></NoContent>
      } else {
          return <List data={result.data} userId={userId} ></List>
      }
  } else {
      throw Error("Unhandled status")
  }

}

const ConversationsPanel = ({id, name} : {id : number , name : string}) => {
  return (
    <>
      <Header name={name} />
      <ConversationsChat id={id} />
      <ChatFooter />
    </>
  )
}

const Conversations = () => {
  const chatContext = useChatContext()
  const id = chatContext.conversationInfo.id
  const name = chatContext.conversationInfo.name

  return (
    <div className="flex flex-col justify-between max-m-custom-md:w-[100%] top_2 col-span-2 max-m-custom-md:col-span-1 h-[60vh] max-m-custom-md:h-full row-span-2 ">
      { 
      
      id != undefined ? (
        <ConversationsPanel id={id} name={name}/>
      ) : (
        <div> No Conversation Open ! </div>
      )
      
      }
    </div>
  )
}

export default Conversations;