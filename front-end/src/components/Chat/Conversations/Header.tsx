import { useState} from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

const Header = ({name} : {name : string}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex justify-between mx-6 mt-3 items-center pt-2">
      <button type='button' className=' bg-[#4D194D] py-[6px] px-6  text-sm outline-none text-white'> 
          Exit
      </button>
      <div className="flex flex-col items-center mx-auto ">
        <h2 className="text-sm text-white w-full text-center">
          {name}
        </h2>
      </div>
      <div className="flex flex-col relative">
        <BsThreeDotsVertical
          size={20}
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[3rem] items-center -left-[8rem] w-[150px] h-[160px] justify-center text-white z-[999]">

            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Invite
            </span>
            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Block
            </span>
            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Mute
            </span>
            <span className="text-sm my-3 cursor-pointer hover:text-gray-300 hover:border-gray-300">
              Delete
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

