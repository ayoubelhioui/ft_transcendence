import ChatsGroupsPanel from "./ChatsGroupsPanel/ChatsGroupsPanel";
import { useState } from "react";
import Conversations from "./Conversations/Conversations";
import ChannelInfo from "./ChannelInfo/ChannelInfo";

const Chat = () => {
  //? need to add a state to render a section dynamically

  const [stateName, setStateName] = useState("");

  const handleStateName = (name: string) => {
    setStateName(name);
  };
//!handleStateName={handleStateName}
  return (
    <div className="grid grid-cols-column-layout max-m-custom-md:grid-cols-2 grid-rows-2 gap-4 justify-center h-full items-center my-auto mx-auto max-w-full px-2 w-[1400px] max-sm:w-full">
      <ChatsGroupsPanel />
      <Conversations name={stateName} />
      <ChannelInfo />
    </div>
  );
};

export default Chat;
