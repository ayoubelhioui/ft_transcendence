import ChatsGroupsPanel from "./ChatsGroupsPanel/ChatsGroupsPanel";
import { useState } from "react";
import Conversations from "./Conversations/Conversations";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import { ChatContextProvider } from "./ChatContext";

const Chat = () => {
  return (
    <div className="grid grid-cols-column-layout max-m-custom-md:grid-cols-2 grid-rows-2 gap-4 justify-center h-full items-center my-auto mx-auto max-w-full px-2 w-[1400px] max-sm:w-full">
      <ChatContextProvider>
        <ChatsGroupsPanel/>
        <Conversations />
      </ChatContextProvider>
      {/* <ChannelInfo /> */}
    </div>
  );
};

export default Chat;
