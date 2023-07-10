import ChatFriends from "./ChatFriends"
import ChannelInfo from "./ChannelInfo"
// import Channels from "./Channels"
import Conversations from "./Conversations"
import OnlineFriends from "./OnlineFriends"


const Chat = () => {
  
  //? need to add a state to render a section dynamically


  return (
    // <div className="home flex bg-profile-bg bg-cover bg-center drop-shadow-sm rounded-[10px] max-sm:rounded-none w-[90%] mx-auto h-[80vh] max-w-[1600px] max-sm:w-[100vw] max-md:w-[95%] max-sm:h-full ">
        <div className="grid grid-cols-column-layout grid-rows-2 gap-4 justify-center items-center my-auto w-[100%] px-[1vw] max-md:px-6 max-sm:px-2 max-md:w-full">
          <ChatFriends />
          <Conversations />
          <ChannelInfo />
        </div>
        
    // </div>
  )
}

export default Chat
