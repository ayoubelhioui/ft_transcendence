import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";
import { ReactNode, useState} from "react";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";

import { VscSettings } from "react-icons/vsc";
import { Console } from "console";
import { useAppServiceContext } from "../../../Context/Context";
import { useChatsGroupsPanelContext } from "./ChatsGroupsPanelContext";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <div className="flex flex-col gap-4 pt-2 overflow-y-scroll">
            <div className="flex justify-between px-2 py-1  items-center w-full text-blue-950 bg-white opacity-30 cursor-pointer">
                <span className="text-sm">Public Groups</span>
                <RiArrowDropDownLine size={25} />
            </div>
            {children}
        </div>
    )
}

const Item = ({payload} : {payload : any}) => {
    const appService = useAppServiceContext()
    const channel = payload
    const chatsGroupsPanelContext = useChatsGroupsPanelContext()
    const avatar = `http://${address}/users/image/${channel.avatar}`


    const joinToChannel = async (channelId: number) => {
        const res = await appService.requestService.postJoinChannelRequest(channelId)
        if (res.status == STATUS_ERROR) {
            //console.log(res.message)
            //!popup message
        } else {
            chatsGroupsPanelContext.setUpdateListChannelsJoin(!chatsGroupsPanelContext.updateListChannelsJoin)
            //console.log("join success")
            //!join success
        }
    };

    return (
        <div className="flex mt-2 items-center justify-between mx-6">
            <div className="flex items-center gap-4 ml-6 cursor-pointer">
                <img src={avatar}
                alt="avatar"
                className=" object-cover rounded-full w-[45px] h-[45px] cursor-pointer"
                />
                <h2 className="text-white">{channel.name}</h2>
            </div>
            <button
                type="button"
                className="text-white bg-purple-950 p-2 text-sm "
                onClick={() => joinToChannel(channel.id)}
            >
                Join Now
            </button>
        </div>
    )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mx-auto text-gray-400 justify-center items-center"> No Groups Available </div>
        </Wrapper>
    )
}


const List = ({list} : {list : any}) => {
    list = list.filter((item : any) => (item.visibility === "public"));

    return (
    <Wrapper>
        {
            list.map((item : any, index : number) => (            
                <Item key={item.id} payload={item}/>
            ))
        }
    </Wrapper>
    
    )
}

const PublicGroup = ({result, list} : {result : any, list : any}) => {
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
        if (!list || list.length === 0) {
            return <NoContent></NoContent>
        } else {
            return <List list={list}></List>
        }
    } else {
        throw Error("Unhandled status")
    }

}

export default PublicGroup
