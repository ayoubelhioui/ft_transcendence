import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { Console } from "console";
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";
import { useChatsGroupsPanelContext } from "./ChatsGroupsPanelContext";
import { openPopupError, openPopupStatus } from "../../HomePage/Popup/Popup";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <div className="flex flex-col gap-4 mt-6 overflow-y-scroll">
          <div className="flex justify-between px-2 py-1 items-center w-full text-blue-950 bg-white opacity-30 cursor-pointer">
            <span className="text-sm">Protected Groups</span>
            <RiArrowDropDownLine size={25} />
          </div>
          {children}
        </div>
    )
}

const Item = ({payload} : {payload : any}) => {
  const appService = useAppServiceContext()
  const chatsGroupsPanelContext = useChatsGroupsPanelContext()
  const channel = payload
  const avatar = `http://${address}/users/image/${channel.avatar}`
  const [password, setPassword] = useState<string>("");
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const joinToChannel = async (channelId: number) => {
      const res = await appService.requestService.postJoinChannelRequest(channelId, {
        password : password
      })
      if (res.status == STATUS_ERROR) {
        openPopupError("Incorrect password.")
      } else {
        chatsGroupsPanelContext.setUpdateListChannelsJoin(!chatsGroupsPanelContext.updateListChannelsJoin)
        openPopupStatus("Join success")
      }
  };

  return (
      <div className="flex mt-2 items-center justify-between mx-6 relative">
          
          {!isOpened && (
            <>
              <div className="flex items-center gap-4 ml-6 cursor-pointer">
                <img
                  src={avatar}
                  alt="avatar"
                  className=" object-cover rounded-full w-[45px] h-[45px] cursor-pointer"
                />

                <h2 className="text-white">{channel.name}</h2>
              </div>
              <button
                  type="button"
                  className="text-white relative bg-purple-950 p-2 text-sm outline-none"
                  onClick={() => {setIsOpened(!isOpened)}}
                >
                  Join Now
              </button>
            </>
          )

          }

          {isOpened && (

            <div className=" bg-blue-950  rounded-[10px] w-[150px] h-[100%] text-white z-[999] top-14 left-1/3">
              <div className="flex flex-col">
                <input
                  autoComplete="off" 
                  type="password"
                  placeholder="Enter Password"
                  className="bg-transparent text-white w-[180px] h-[20px] outline-none p-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white bg-purple-950 p-2 w-[100px] mx-auto text-sm "
                  onClick={() => joinToChannel(channel.id)}
                >
                  Join Now
                </button>
              </div>
            </div>
          )}
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
    list = list.filter((item : any) => !(item.visibility === "public"));
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

const ProtectedGroup = ({result, list} : {result : any, list : any}) => {
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

  
export default ProtectedGroup