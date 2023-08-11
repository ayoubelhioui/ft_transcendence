import { useAppServiceContext } from '../../../Context/Service/AppServiceContext';

import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { useChatContext } from '../ChatContext';
import { useEffect } from 'react';
import { STATUS_SUCCESS, address } from '../../../Const';
import { RequestResultI } from '../../../Context/Service/RequestService';

const ChannelImage = () => {
  let avatar = "/src/assets/ping-pong-player-darkbg.png"
  let name = "No name"
  const chatContext = useChatContext()
  const conversationInfo = chatContext.conversationInfo
  
  if (conversationInfo.id) {
    avatar = `http://${address}/users/image/${conversationInfo.avatar}`
    name = conversationInfo.name
  }

  return (
    <div className="flex flex-col items-center w-full mt-20">
      <img src={avatar} alt='Channel' className=' object-cover rounded-full w-[110px] h-[110px]'/>
      <h2 className='text-white text-sm pt-2'>{name}</h2>
    </div> 
)
}

export default ChannelImage
