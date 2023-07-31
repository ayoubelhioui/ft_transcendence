import { useAppServiceContext } from '../../../Context/Context';
import { useChatContext } from '../ChatContext';
import AdminMembers from './AdminMembers';
import ChannelMembers from './ChannelMembers';
import ChannelImage from './ChannelImage';
import { STATUS_ERROR, STATUS_UNDEFINED } from '../../../Const';


const ChannelInfo = () => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const conversationInfo = chatContext.conversationInfo
  const response = appService.requestService.getChannelUsers(conversationInfo)
  const result = response.state

  response.effect([conversationInfo])

  //!filter list with the status should be implement in the saver
  //!the data should be two list with the name {admins, members}


  if (result.status === STATUS_UNDEFINED || result.status === STATUS_ERROR) {
    return (
      <div></div>
    )
  }

  return (
    <div className="flex top_2 col-span-1 row-span-2 max-m-custom-md:hidden h-[750px] max-custom-lg:h-[700px] w-full flex-col">

        <ChannelImage />

        <span className='w-[80%] mx-auto h-[1px] bg-gray-500 opacity-80 mt-[50px] max-md:hidden'></span>

        {/* Admins Element */}

        <div className="flex mt-8 w-[80%] mx-auto flex-col items-start text-white overflow-y-scroll">
          <div className="flex justify-between w-full items-center">

            <h2 className=' text-lg tracking-wide'>ADMINS</h2>

          </div>

          {<AdminMembers result={result} />}
        </div>

        {/* Members Element ,, possibly adding how many members,Admins in the channel*/}

        <div className="flex flex-col w-[80%] text-white mt-12 mx-auto overflow-y-scroll">
          <div className="flex justify-between w-full items-center">

            <h2 className='text-lg tracking-wide'>MEMBERS</h2>

          </div>

          {<ChannelMembers result={result} />}
          
        </div>
    </div>
  )
}

export default ChannelInfo
