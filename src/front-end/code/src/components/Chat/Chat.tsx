import ChatsGroupsPanel from "./ChatsGroupsPanel/ChatsGroupsPanel";
import { useState } from "react";
import Conversations from "./Conversations/Conversations";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import { ChatContextProvider } from "./ChatContext";
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";
import { useParams } from "react-router-dom";

const Chat = () => {
  const params = useParams();
  let chatId = params.id ? +params.id : undefined

  return (
    <div className="grid grid-cols-column-layout grid-rows-2 max-m-custom-md:grid-rows-layout-min gap-4 max-custom-md:gap-0 max-custom-md:w-[90%] justify-center my-auto max-m-custom-md:my-0 items-center mx-auto max-w-full px-2 w-[1400px] max-sm:w-full">
      <ChatContextProvider chatId={chatId}>
        <ChatsGroupsPanel/>
        <Conversations />
        <ChannelInfo />
      </ChatContextProvider>
    </div>
  );
};

export default Chat;
