import ChatFriends from "./ChatFriends"
import ChannelInfo from "./ChannelInfo"
import Channels from "./Channels"
import Conversations from "./Conversations"


const Chat = () => {
  return (
    <div className="home flex flex-col bg-profile-bg bg-cover bg-center drop-shadow-sm rounded-[10px] max-sm:rounded-none w-[100%] mx-auto h-[100vh] max-sm:w-[100vw] max-md:w-[95%] max-sm:h-full max-sm:pt-14">
        <div className="grid grid-cols-column-layout gap-4 justify-center items-center my-auto mx-auto w-[1800px] max-sm:w-full">
          <ChatFriends />
          <Conversations />
          <ChannelInfo />
        </div>
    </div>
  )
}

export default Chat
