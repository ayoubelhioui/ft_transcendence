import { authContext } from '../context/useContext';

import { useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdSend } from 'react-icons/md'


const ChatFooter = () => {
  const [message, setMessage] = useState('');

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(message);

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

        <button type='submit' className=' outline-none p-0'>
          <MdSend size={25} className=' text-gray-400' />
        </button>

      </form>
    </div>
  )
}

const Sender = () => {
  return (
      <div className="flex flex-col">
          <span className='text-white text-sm text-right'>You</span>
          <div className="h-min text-lg text-white back max-w-[200px] p-[10px] rounded-[10px] ml-auto">
            <p className=''>Hello, Im Mouad and You ?</p>
          </div>
      </div>
  )
}
const Receiver = () => {
  return (
      <div className="flex flex-col">
          <span className='text-white text-sm text-left'>Other</span>
          <div className="text-lg text-white back max-w-[200px] h-min p-[10px] rounded-[10px] overflow-y-scroll">
            <p className=' break-words'>rgfderrfcvgrwdsTrgdfvchagdfchtdgbvnrgfrsdcks</p>
          </div>
      </div>
  )
}

const Conversations = () => {
  const authApp = authContext();

  const [isOpened, setIsOpened] = useState(false);

  const isBool: boolean = false;

  return (
    !isBool ? (
      <div className="flex flex-col justify-between top_2 col-span-2 h-[850px] row-span-2 ">
        <div className="flex justify-between mx-6 mt-3 items-center pt-2">
          <div className="flex flex-col items-center mx-auto ">
            {/* <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[55px] h-[55px]'/> */}
            <h2 className='text-sm text-white w-full text-center'>NameofTheGroup</h2>
          </div>
          <div className="flex flex-col relative">
            <BsThreeDotsVertical size={20} className='text-white cursor-pointer' onClick={() => setIsOpened(!isOpened)}/>

            { isOpened && 
              <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[3rem] -left-[6rem] w-[120px] h-[130px] items-center justify-center text-white">
                
                {/* I need to check if the user is an admin, and if he is then i will have to display block and mute and add */}
                
                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' >Add a Friend</span>
                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' >Block Someone</span>
                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' >Mute Someone</span>

              </div>
            }
          </div>
        </div>

        {/* Body Of The Conversation */}
 
        <div className="w-full h-full px-4 mt-8 overflow-y-scroll">
            <Sender />
            <Receiver />
            <Sender />
            <Receiver />
            <Sender />
            <Receiver />
            
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
