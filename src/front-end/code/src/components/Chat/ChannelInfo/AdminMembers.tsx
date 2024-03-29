import { useNavigate } from 'react-router-dom';
import { STATUS_SUCCESS, address } from '../../../Const';
import { RequestResultI } from '../../../Context/Service/RequestService';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { useAppServiceContext } from '../../../Context/Service/AppServiceContext';
import { useChatContext } from '../ChatContext';
import { Avatar } from '@mui/material';

interface ChannelMember {
  id : number
  username : string
  userRole : number
}

enum Rule {
  MEMBER = 0,
  ADMIN = 1,
  OWNER = 2
}

const Kik = "kick"
const Block = "block"
const ChangeRule = "change rule"
const Mute = "mute"


const ThreeButtonList = ({payload, list} : {payload : any, list : any}) => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()

  const itemClick = async (type : string) => {
    if (type === Kik) {
      const res = await appService.requestService.kickMember(chatContext.conversationInfo.id!, payload.id)
      if (res.status === STATUS_SUCCESS)
        chatContext.setUpdateChats((value : boolean) => !value)
    } else if (type === Block) {
      const res = await appService.requestService.blockMember(chatContext.conversationInfo.id!, payload.id)
      if (res.status === STATUS_SUCCESS)
        chatContext.setUpdateChats((value : boolean) => !value)
    } else if (type === "Turn To Member" || type === "Turn To Admin") {
      const newRule = type === "Turn To Admin" ? 1 : 0
      const res = await appService.requestService.changeMemberRole(chatContext.conversationInfo.id!, payload.id, newRule)
      if (res.status === STATUS_SUCCESS)
        chatContext.setUpdateChats((value : boolean) => !value)
    } else if (type === Mute) {
      const res = await appService.requestService.muteMember(chatContext.conversationInfo.id!, payload.id, 60)
      if (res.status === STATUS_SUCCESS)
        chatContext.setUpdateChats((value : boolean) => !value)
    }
  }

  return (
    <>
    {
      list.map((item : any, index : number) => (
        <span key={index} onClick={() => itemClick(item)} className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
          {item}
        </span>
      ))
    }
    </>
  )
}


export const ThreeButton = ({payload, myRule} : {payload : any, myRule : number}) => {
  const [isOpen, setIsOpen] = useState(false);

  let a : any[] = []
  if (myRule === Rule.OWNER) {
    if (payload.userRole === Rule.ADMIN || payload.userRole === Rule.MEMBER) {
      a = [Kik, Block, ChangeRule, Mute]
      if (payload.userRole === Rule.ADMIN)
        a[2] = "Turn To Member"
      else
        a[2] = "Turn To Admin"
    }
  } else if (myRule === Rule.ADMIN) {
    if (payload.userRole === Rule.MEMBER) {
      a = [Kik, Block, Mute]
    }
  }
  
  if (a.length === 0)
    return <div></div>
  
  return (
    <div className="flex flex-col relative ml-auto mr-2">
      <BsThreeDotsVertical
        size={20}
        className="text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="flex flex-col bg-blue-950 items-center rounded-[10px] absolute top-[1.5rem] -left-[5rem] w-[130px] inline-block justify-center text-white">
          <ThreeButtonList payload={payload} list={a} />
        </div>
      )}
    </div>
  )
}

const Item = ({payload, myRule} : {payload : any, myRule : number}) => {
  const user = payload
  const navigate = useNavigate();
  const userId = user.id
  const avatar = `http://${address}/users/image/${userId}`

  const imageOnClick = () => {
    navigate(`/Profile/${payload.id}`)
  }

  

  return (
    <>
      <div className="flex items-center mt-5 ml-2 gap-4">
        <Avatar onClick={imageOnClick} src={avatar} alt={user.username} className=' object-cover rounded-full w-[40px] h-[40px]'/>
        <h2 className='text-white text-sm'>{user.username}</h2>
        <ThreeButton payload={payload} myRule={myRule} />
      </div>
      
    </>
  )
}

const NoContent = () => {
  return (
      <div className="flex mx-auto h-screen w-full justify-center items-center text-3xl text-gray-400"> No Friends Found </div>
  )
}


const List = ({list, myRule} : {list : any, myRule : number}) => {
  //console.log("Admins", list)
  return (
      <div className='w-full h-full'>
          {
              list.map((item : any, index : number) => (            
                  <Item key={item.id} payload={item} myRule={myRule}/>
              ))
          }
      </div>
  )
}

const AdminMembers = ({result, myRule}: {result : RequestResultI, myRule : number}) => {

  if (result.status === STATUS_SUCCESS) {
    if (result.data.length !== 0) {
      return (
        <List list={result.data.admins} myRule={myRule}/>
      )
    } else {
      return (
        <NoContent />
      )
    }
  } else {
    return (
      <NoContent />
    )
  }
}

export default AdminMembers
