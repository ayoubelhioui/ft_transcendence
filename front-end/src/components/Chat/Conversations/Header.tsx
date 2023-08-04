import { useState} from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { useAppServiceContext } from "../../../Context/Context";
import { ConversationInfoI, useChatContext } from "../ChatContext";
import { STATUS_SUCCESS } from "../../../Const";
import InviteUser from "./InviteUser";

const Header = ({conversationInfo} : {conversationInfo : ConversationInfoI}) => {
  const name = conversationInfo.name
  const isGroup = conversationInfo.isGroup
  const id = conversationInfo.id
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  const appService = useAppServiceContext()
  const chatContext = useChatContext()

  const [isOpen, setIsOpen] = useState(false)

  const leaveClick = async () => {
    const res = await appService.requestService.deleteLeaveChannel(id!)
    console.log("Leave channel: ", res)
    if (res.status === STATUS_SUCCESS) {
      chatContext.setUpdateChats((value : boolean) => !value)
    } else {
      //!error
    }
  }

  

  return (
    <div className="flex justify-between items-center pt-2">
      {
        isGroup &&
        <button onClick={leaveClick} type='button' className=' bg-[#4D194D] py-[6px] px-6  text-sm outline-none ml-2 max-sm:ml-1 text-white'> 
            Leave
        </button>
      }
      <div className="flex flex-col items-center mx-auto ">
        <h2 className="text-sm text-white w-full text-center">
          {name}
        </h2>
      </div>

      <InviteUser openState={[isInviteOpen, setIsInviteOpen]}/>

      {
        isGroup &&
      <div className="flex flex-col relative">
        <BsThreeDotsVertical
          size={20}
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[1.5rem] items-center -left-[4rem] w-[80px] h-[70px] justify-center text-white z-[999]">

            <span onClick={() => {setIsInviteOpen(true) } } className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Invite
            </span>
          </div>
        )}
      </div>

      }
    </div>
  )
}

export default Header

