import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const ChannelCreation = () => {
  const [isCreated, setIsCreated] = useState(true);

  const [channelName, setChannelName] = useState('');

  const [NewAvatar, setNewAvatar] = useState<File | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState('');


  const handleSubmit = () => null;
  const handleChannelName = (event: React.ChangeEvent<HTMLInputElement>) => setChannelName(event.target.value);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          setNewAvatar(event.target.files[0]);
      }
  };

  const HandleClose = () => setIsCreated(false);
  return (
      <div className=''>
            <Dialog open={isCreated} onClose={HandleClose} className="flex h-full w-full items-center justify-center">
                <div className="w-[400px] flex flex-col justify-center items-center overflow-hidden h-[500px] text-white bg-blue-950">
                    <DialogTitle className='text-center text-xl'>Create a Channel</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className='flex flex-col mt-4'>
                            <label htmlFor="name_input" className='flex ml-5 text-white'>Group's Name:</label>
                            <input
                                type="name"
                                className=' py-3 rounded-[10px]'
                                placeholder="Name"
                                value={channelName}
                                onChange={handleChannelName}
                            />

                            {/* Image Component */}

                            <div className="flex items-start justify-center flex-col">
                                <label htmlFor="file_input" className='flex ml-5 text-white'>Upload Avatar:</label>
                                <input type="file" accept="image/*" onChange={handleImage} className='py-3 rounded-[10px]                                   border-blue-950 border-2 '/>
                            </div>

                            {/* DropDown Component */}

                            <label htmlFor="name_input" className='flex ml-5 text-white'>Group's Type:</label>
                            <div className="flex flex-col items-center justify-center mx-5 mt-4">
                                <div className="bg-blue-950 rounded-[10px] p-2 flex text-white border items-center w-full border-white" onClick={() => setIsOpen(!isOpen)}>
                                    { selected || 'Select Type'}
                                    <RiArrowDropDownLine size={25}/>
                                </div>
                                <ul className={`rounded-[10px] bg-white text-center flex flex-col text-blue-950 font-semibold ${isOpen ? 'block' : 'hidden'} w-full p-2`}>
                                    <li className='mt-2 hover:outline hover:outline-sky-700 cursor-pointer' onClick={() => setSelected('Public')}>Public</li>
                                    <li className='mt-2 hover:outline hover:outline-sky-700 cursor-pointer' onClick={() => setSelected('Protected')}>Protected</li>
                                    <li className='mt-2 hover:outline hover:outline-sky-700 cursor-pointer' onClick={() => setSelected('Private')}>Private</li>
                                </ul>
                            </div>
                            <button type='submit' className='py-2 px-6 mt-12 bg-white text-blue-950 font-semibold mx-3' onClick={(event) => event.preventDefault()}>Create</button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
      </div>
  )
}

const FriendInvitation = () => {
    return (
        <div>

        </div>
    )
}

const Friends = () => {

  const [IsOpen, setOpen] = useState(false);

  const [isInvited, setIsInvited] = useState(false);
  const [channelCreate, setChannelCreate] = useState(false);


  return (
    <div className="flex flex-col top_1 w-[300px] text-gray-400 max-m-custom-md:w-[100%] max-sm:h-[280px] h-[550px] my-auto max-m-custom-md:h-[200px]">
		
      <h1 className="text-2xl p-2">Friends List</h1>
      
      <div className="flex flex-col">

        <div className="flex items-center justify-between">

          <div className="flex relative justify-between items-center">
            <input type="search" className="shadow border-0 my-4 mx-2 w-[230px]" placeholder="Search a friend..." />
            <button type="button" onClick={() => null} className='absolute left-[67%] mt-1 mr-0'>
              <BiSearchAlt2 size={20} />
            </button>
          </div>

          <div className="flex flex-col relative">

              <button type='button' className='outline-none p-0' onClick={() => setOpen(!IsOpen)}>
                <BsThreeDotsVertical size={22} />
              </button>

            {IsOpen && (
              <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[3rem] -left-[4rem] w-[120px] h-[120px] items-center justify-center text-white">

                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' onClick={() => setIsInvited(!isInvited)}>Invite a Friend</span>
                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' onClick={() => setChannelCreate(!channelCreate)}>Create a Channel</span>


              </div>
            )}
              { channelCreate && <ChannelCreation /> }
              { isInvited && <FriendInvitation /> }
          </div>

        </div>

        {/* Friends List (Icons and Settings) */}

        <div className="flex flex-col">
            <div className="flex">
                  
            </div>      
        </div>

      </div>
    </div>
  );
}

export default Friends;