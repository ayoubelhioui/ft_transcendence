import ChatFriends from "./ChatFriends";
import ChannelInfo from "./ChannelInfo";
// import Channels from "./Channels"
import Conversations from "./Conversations";
// import OnlineFriends from "./OnlineFriends";
import { useState } from "react";

const Chat = () => {
  //? need to add a state to render a section dynamically

  const [stateName, setStateName] = useState("");

  const handleStateName = (name: string) => {
    setStateName(name);
  };

  return (
    <div className="grid grid-cols-column-layout max-m-custom-md:grid-cols-2 grid-rows-2 gap-4 justify-center h-full items-center my-auto mx-auto max-w-full px-2 w-[1400px] max-sm:w-full">
      <ChatFriends handleStateName={handleStateName} />
      <Conversations name={stateName} />
      <ChannelInfo />
    </div>
  );
};

export default Chat;
