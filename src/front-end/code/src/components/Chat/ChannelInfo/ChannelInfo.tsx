import { useAppServiceContext } from '../../../Context/Context';
import { useChatContext } from '../ChatContext';
import AdminMembers from './AdminMembers';
import ChannelMembers from './ChannelMembers';
import ChannelImage from './ChannelImage';
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED } from '../../../Const';


const ChannelInfo = () => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const conversationInfo = chatContext.conversationInfo
  const response = appService.requestService.getChannelUsers(conversationInfo)
  //console.log("list channel users : ", response)
  const result = response.state
  let myRule = -1

  response.effect([conversationInfo, chatContext.updateChats])

  if (result.status === STATUS_SUCCESS) {
    let a = result.data.admins.find((item : any) => item.id === appService.authService.user?.id)
    let b = result.data.members.find((item : any) => item.id === appService.authService.user?.id)
    if (a)
      myRule = a.userRole
    if (b)
      myRule = b.userRole
    //console.log("======>", myRule)
  }

  if (result.status === STATUS_UNDEFINED || result.status === STATUS_ERROR) {
    return (
      <div className="flex top_2 col-span-1 row-span-2 max-m-custom-md:hidden h-[750px] max-custom-lg:h-[700px] w-full flex-col max-custom-lg:hidden">
        
      </div>
    )
  }

  return (
    <div className="flex top_2 col-span-1 row-span-2 max-m-custom-md:hidden h-[750px] max-custom-lg:h-[700px] w-full flex-col">

        <ChannelImage />

        <span className='w-[80%] mx-auto h-[1px] bg-gray-500 opacity-80 mt-[50px] max-md:hidden'></span>

        {/* Admins Element */}

        <div className="flex mt-8 w-[80%] mx-auto flex-col items-start text-white">
          <div className="flex justify-between w-full items-center">

            <h2 className=' text-lg tracking-wide'>ADMINS</h2>

          </div>

          {<AdminMembers result={result}  myRule={myRule}/>}
        </div>

        {/* Members Element ,, possibly adding how many members,Admins in the channel*/}

        <div className="flex flex-col w-[80%] text-white mt-12 mx-auto">
          <div className="flex justify-between w-full items-center">

            <h2 className='text-lg tracking-wide'>MEMBERS</h2>

          </div>

          {<ChannelMembers result={result} myRule={myRule} />}
          
        </div>
    </div>
  )
}

export default ChannelInfo
