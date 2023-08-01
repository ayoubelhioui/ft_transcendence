import ChatsGroupsPanel from "./ChatsGroupsPanel/ChatsGroupsPanel";
import { useState } from "react";
import Conversations from "./Conversations/Conversations";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import { ChatContextProvider } from "./ChatContext";
import { useAppServiceContext } from "../../Context/Context";
import { useParams } from "react-router-dom";

const Chat = () => {
  const params = useParams();
  let chatId = params.id ? +params.id : undefined

  return (
    <div className="grid grid-cols-column-layout max-m-custom-md:grid-cols-1 grid-rows-2 max-m-custom-md:grid-rows-1 gap-4 justify-center my-auto max-m-custom-md:my-0 items-center mx-auto max-w-full px-2 w-[1400px] max-sm:w-full">
      <ChatContextProvider chatId={chatId}>
        <ChatsGroupsPanel/>
        <Conversations />
        <ChannelInfo />
      </ChatContextProvider>
    </div>
  );
};

export default Chat;
