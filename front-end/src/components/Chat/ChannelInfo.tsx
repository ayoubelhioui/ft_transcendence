import { authContext } from '../context/useContext';

const ChannelInfo = () => {
  const authApp = authContext();

  return (
    <div className="flex top_2 col-span-1 row-span-2 max-sm:hidden h-[750px] w-full flex-col">
        <div className="flex flex-col items-center w-full mt-20">
          <img src={authApp.user?.avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[110px] h-[110px]'/>
          <h2 className='text-white text-sm pt-2'>NameOfChannel</h2>
        </div> 

        <span className='w-[80%] mx-auto h-[1px] bg-gray-500 opacity-80 mt-[50px] max-md:hidden'></span>

        {/* Admins Element */}

        <div className="flex mt-8 w-[80%] mx-auto flex-col items-start text-white overflow-y-scroll"> 
          <h2 className=' text-lg tracking-wide'>ADMINS</h2>
          <div className="flex items-center mt-5 ml-5 gap-2">
            <img src={authApp.user?.avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
            <h2 className='text-white text-sm'>logiName</h2>
          </div>
          <div className="flex items-center mt-5 ml-5 gap-2">
            <img src={authApp.user?.avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
            <h2 className='text-white text-sm'>logiName</h2>
          </div>
        </div>

        {/* Members Element ,, possibly adding how many members,Admins in the channel*/}

        <div className="flex flex-col w-[80%] text-white mt-12 mx-auto overflow-y-scroll">
          <h2 className='text-lg tracking-wide'>MEMBERS</h2>
          <div className="flex items-center mt-5 ml-5 gap-2">
            <img src={authApp.user?.avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
            <h2 className='text-white text-sm'>logiName</h2>
          </div>
          <div className="flex items-center mt-5 ml-5 gap-2">
            <img src={authApp.user?.avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
            <h2 className='text-white text-sm'>logiName</h2>
          </div>
          <div className="flex items-center mt-5 ml-5 gap-2">
            <img src={authApp.user?.avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
            <h2 className='text-white text-sm'>logiName</h2>
          </div>
          
        </div>
    </div>
  )
}

export default ChannelInfo
