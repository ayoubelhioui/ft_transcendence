import { BiSearchAlt2 } from 'react-icons/bi';

import { AiOutlinePlusCircle as PlusCircle } from 'react-icons/ai'

const UserFriends = () => {
  return (
    <div className="flex">
        htgdgrf
    </div>
  )
}

const ChannelsGroup = () => {
  return (
    <div className="flex">
      df
    </div>
  )
}

const ChatFriends = () => {
  return (
    <div className="top_2 col-span-1 row-span-2 max-sm:hidden">
        <div className="pt-4 flex h-full w-full justify-between items-center">
            <input type="search" className="shadow border-0 text-white w-full" placeholder="Search a friend..." />
            {/* <button type="button" onClick={() => null} className='absolute left-[65%] mt-3 mr-4'>
              <BiSearchAlt2 size={20} />
            </button> */}
            <button type='button'>
                <PlusCircle size={30} className='text-white'/>
            </button>
        </div>
        <div className="flex mt-4">
            <UserFriends />
            <ChannelsGroup />
        </div>    
    </div>
  )
}

export default ChatFriends
