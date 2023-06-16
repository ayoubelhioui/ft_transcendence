import { useState } from 'react';
import { authContext } from '../context/useContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdSend } from 'react-icons/md'


const ChatFooter = () => {
  const [message, setMessage] = useState('');

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Temporary setter
    setMessage('');
  };
  return (
    <div className="flex items-center">
      <form className="flex items-center w-full" onSubmit={handleMessage}>
        <input 
          type="search"
          className=" inp border-0 text-white shadow w-[90%]"
          placeholder="Send A Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type='button' className=' outline-none p-0'>
          <MdSend size={25} className=' text-gray-400' onClick={handleMessage}/>
        </button>

      </form>
    </div>
  )
}

const Conversations = () => {
  const authApp = authContext();

  const isBool: boolean = false;

  return (
    !isBool ? (
      <div className="flex flex-col justify-between top_2 col-span-2 h-[950px] row-span-2 ">
        <div className="flex justify-between mx-6 mt-3 items-center">
          {/* <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[50px] h-[50px]'/> */}
          <h2 className='text-lg text-white w-full text-center'>NameofTheGroup</h2>
          <BsThreeDotsVertical size={25} className='text-white cursor-pointer'/>
          {/* <span className='w-[100%] h-[1px] bg-gray-500 opacity-80 mt-2'></span> */}
        </div>
        <div className="w-full h-full flex ">
          gfedfgcefg
        </div>

        <ChatFooter />

      </div>
    ) : 
    <div className="flex top_2 col-span-3 h-[950px] row-span-2 ">
        {/* Your content here */}
    </div>
  )
}

export default Conversations
