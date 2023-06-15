import { authContext } from '../context/useContext';
import { BsThreeDotsVertical } from 'react-icons/bs';


const Conversations = () => {
  const authApp = authContext();

  const isBool: boolean = false;

  return (
    !isBool ? (
      <div className="flex flex-col justify-between top_2 col-span-2 h-[950px] row-span-2 ">
        <div className="flex justify-between mx-6 mt-3 items-center">
          {/* <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[50px] h-[50px]'/> */}
          <h2 className='text-lg text-white w-full text-center'>NameofTheGroup</h2>
          <BsThreeDotsVertical size={25} className='text-white'/>
          {/* <span className='w-[100%] h-[1px] bg-gray-500 opacity-80 mt-2'></span> */}
        </div>
        <div className="flex">
          <input type="search" className=" inp border-0 text-white shadow w-[90%]" placeholder="send A Message..." />

          {/* need to add a send icon beside it */}
        </div>
      </div>
    ) : 
    <div className="flex top_2 col-span-3 h-[950px] row-span-2 ">
        {/* Your content here */}
    </div>
  )
}

export default Conversations
