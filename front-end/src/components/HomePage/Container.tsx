
import { MdKeyboardDoubleArrowRight as RightArrowIcon, MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { VscAccount as AccountIcon } from 'react-icons/vsc'


export const Live = () => {
  return (
    <div className=' min-h-[350px] max-md:min-h-[270px] back rounded-[10px] flex-1 mr-16 flex flex-col justify-between shadow-md max-md:mr-0'>
          <h1 className="text-2xl p-2">Live Games</h1>
          <div className=" flex gap-4 flex-col justify-center">
            <div className="flex mx-auto">
              <AccountIcon size={50}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
              <AccountIcon size={50}/>
            </div>
            <div className="flex mx-auto">
              <AccountIcon size={50}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
              <AccountIcon size={50}/>
            </div>
            <div className="flex mx-auto">
              <AccountIcon size={50}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
              <AccountIcon size={50}/>
            </div>
          </div>
          <div className="flex justify-center cursor-pointer hover:animate-bounce">
            <span className='pb-[7px]'>See More</span>
            <SingleArrow size={25}/>
          </div>
        </div>
  )
}

export const Results = () => {
    return (
        <div className=' max-md:mt-4 relative back min-h-[350px] max-md:min-h-[270px] rounded-[10px] flex-1 shadow-md flex flex-col justify-between overflow-x-auto'>
          <h1 className="text-2xl p-2">Latest Results</h1>
          <div className="flex gap-4 flex-col justify-center">
            <div className="flex mx-auto">
              <AccountIcon size={50}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl'>1 - 0</span>
              </div>
              <AccountIcon size={50}/>
            </div>
            <div className="flex mx-auto">
              <AccountIcon size={50}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl'>1 - 5</span>
              </div>
              <AccountIcon size={50}/>
            </div>
            <div className="flex mx-auto">
              <AccountIcon size={50}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl'>3 - 2</span>
              </div>
              <AccountIcon size={50}/>
            </div>
          </div>
          <div className="flex justify-center cursor-pointer hover:animate-bounce">
            <span className='pb-[7px]'>See More</span>
            <SingleArrow size={25}/>
          </div>
        </div>
    )
  }

  export const TopPlayers = () => {

    return (
        <div className="flex flex-col top max-sm:mt-12 max-sm:mx-2 max-md:mx-4 max-md:mb-3">
          <div className="flex justify-between ">
            <h1 className='text-white text-2xl mx-4 my-2'>Top Players</h1>
            <RightArrowIcon size={35} className=' text-white cursor-pointer hover:animate-pulse'/>
          </div>
          <div className="flex text-white justify-around mt-4 items-center overflow-x-auto">
            <div className="align">
              <AccountIcon size={80} className='max-sm:w-[75%]'/>
              <span className="text-center mt-3 max-md:mt-1 text-md">User1</span>
              <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
              <span className='text-sm max-md:text-xs'>1507Pts</span>
            </div>
            <div className="align">
              <AccountIcon size={80} className='max-sm:w-[75%]'/>
              <span className="text-center mt-3 max-md:mt-1 text-md">User2</span>
              <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
              <span className='text-sm max-md:text-xs'>1507Pts</span>
            </div>
            <div className="align">
              <AccountIcon size={80} className='max-sm:w-[75%]'/>
              <span className="text-center mt-3 max-md:mt-1 text-md">User3</span>
              <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
              <span className='text-sm max-md:text-xs'>1507Pts</span>
            </div>
            <div className="align">
              <AccountIcon size={80} className='max-sm:w-[75%]'/>
              <span className="text-center mt-3 max-md:mt-1 text-md">User4</span>
              <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
              <span className='text-sm max-md:text-xs'>1507Pts</span>
            </div>
            <div className="align">
              <AccountIcon size={80} className='max-sm:w-[75%]'/>
              <span className="text-center mt-3 max-md:mt-1 text-md">User5</span>
              <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
              <span className='text-sm max-md:text-xs'>1507Pts</span>
            </div>
          </div>
        </div>
    )
  }
