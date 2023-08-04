import { useNavigate } from 'react-router-dom';
import { STATUS_SUCCESS, address } from '../../../Const';
import { RequestResultI } from '../../../Context/Service/RequestService';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { useAppServiceContext } from '../../../Context/Context';
import { useChatContext } from '../ChatContext';


interface ChannelMember {
  id : number
  username : string
  IntraId : number
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


export const ThreeButton = ({payload, myRule} : {payload : any, myRule : number}) => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()

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
        a.map((item : any, index : number) => (
            <span key={index} onClick={() => itemClick(item)} className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              {item}
            </span>
        ))
      }
    </>
  )
}

const Item = ({payload, myRule} : {payload : any, myRule : number}) => {
  const user = payload
  const navigate = useNavigate();
  //!should return the IntraId
  const intraId = user.IntraId ?? -1
  const avatar = `http://${address}/users/image/${intraId}`

  const [isOpen, setIsOpen] = useState(false);

  const imageOnClick = () => {
    navigate(`/Profile/${payload.id}`)
  }

  return (
    <>
      <div className="flex items-center mt-5 ml-2 gap-4">
        <img onClick={imageOnClick} src={avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[40px] h-[40px]'/>
        <h2 className='text-white text-sm'>{user.username}</h2>
        <div className="flex flex-col relative ml-auto mr-2">
          <BsThreeDotsVertical
            size={20}
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="flex flex-col bg-blue-950 items-center rounded-[10px] absolute top-[1.5rem] -left-[5rem] w-[100px] h-[110px] justify-center text-white">

              <ThreeButton payload={payload} myRule={myRule} />
            </div>
          )}
        </div>
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
  console.log("Admins", list)
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
      //!result.data.members
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
