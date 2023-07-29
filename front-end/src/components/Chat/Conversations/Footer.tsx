
import { ReactNode, useState, useEffect, useRef} from "react";
import { useAppServiceContext } from "../../../Context/Context";
import { MdSend } from 'react-icons/md'
import { useChatContext } from "../ChatContext";

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

export default ChatFooter
