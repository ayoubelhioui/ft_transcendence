


// const Dialog = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const closeDialog = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="fixed inset-0 bg-black opacity-30" onClick={closeDialog}></div>
//             <div className="bg-white rounded-lg w-1/2 p-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-medium">Dialog Title</h2>
//                 <button onClick={closeDialog}>X</button>
//               </div>
//               <div>
//                 <p>Dialog content goes here.</p>
//               </div>
//               <div className="flex justify-end">
//                 <button onClick={closeDialog} className="mr-2">
//                   Cancel
//                 </button>
//                 <button onClick={closeDialog} className="bg-blue-500 text-white">
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



import { useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdSend } from 'react-icons/md'
import { useAppServiceContext } from '../../Context/Context';



const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(message);

    // Temporary setter
    setMessage("");
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

        <button type="submit" className=" outline-none p-0">
          <MdSend size={25} className=" text-gray-400" />
        </button>
      </form>
    </div>
  );
};

const Sender = () => {
  return (
    <div className="flex flex-col">
      <span className="text-white opacity-60 text-sm text-right pr-4 gap-1">
        You
      </span>
      <div className="h-min text-lg text-white back max-w-[200px] p-[10px] rounded-[10px] ml-auto">
        <p className=" break-words">Hello, Im Mouad and You ?</p>
      </div>
    </div>
  );
};
const Receiver = () => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white opacity-60 text-sm text-left pl-4">
        Other
      </span>
      <div className="text-lg text-white back max-w-[200px] h-min p-[10px] rounded-[10px] overflow-y-scroll">
        <p className=" break-words">
          rgfderrfcvgrwdsTrgdfvchagdfchtdgbvnrgfrsdcks
        </p>
      </div>
    </div>
  );
};


const Conversations = () => {
  const appService = useAppServiceContext()
  const authApp = appService.authService;


  const [isOpened, setIsOpened] = useState(false);

  const isBool: boolean = false;

  return !isBool ? (
    <div className="flex flex-col justify-between max-m-custom-md:w-[100%] top_2 col-span-2 max-m-custom-md:col-span-1 h-[65vh] max-m-custom-md:h-full row-span-2 ">
      <div className="flex justify-between mx-6 mt-3 items-center pt-2">
        <div className="flex flex-col items-center mx-auto ">
          {/* <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[55px] h-[55px]'/> */}
          <h2 className="text-sm text-white w-full text-center">
            {
            /* //!{name} */
            }
          </h2>
        </div>
        <div className="flex flex-col relative">
          <BsThreeDotsVertical
            size={20}
            className="text-white cursor-pointer"
            onClick={() => setIsOpened(!isOpened)}
          />

          {isOpened && (
            <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[3rem] items-center -left-[8rem] w-[150px] h-[160px] justify-center text-white z-[999]">
              {/* I need to check if the user is an admin, and if he is then i will have to display block and mute and add */}

              <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
                Add a Friend
              </span>
              <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
                Block a Friend
              </span>
              <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
                Mute a Friend
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body Of The Conversation */}

      <div className="w-full h-full px-4 mt-8 overflow-y-scroll">
        <Sender />
        <Receiver />
        <Sender />
        <Receiver />
      </div>

      <ChatFooter />
    </div>
  ) : (
    <div className="flex top_2 col-span-3 h-[950px] row-span-2 ">
      {/* Your content here */}
    </div>
  );
};

export default Conversations;
