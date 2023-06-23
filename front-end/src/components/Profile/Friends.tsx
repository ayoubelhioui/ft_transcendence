import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const ChannelCreation = () => {
  const [isCreated, setIsCreated] = useState(true);

  const [channelName, setChannelName] = useState('');

  const [NewAvatar, setNewAvatar] = useState<File | null>(null);


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
                <div className="w-[200px] h-[350px] text-white backdrop-blur-md outline-4 outline-blue-950 bg-gray-400 rounded-[15px]">
                    <DialogTitle className='text-center text-xl'>Channel Creation</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className='flex gap-4'>
                            <input
                                type="name"
                                className='w-full py-3 rounded-[10px]'
                                placeholder="Name Of Channel"
                                value={channelName}
                                onChange={handleChannelName}
                            />
                            <input type="file" accept="image/*" onChange={handleImage} className='rounded-[10px]'/>
                            <button type='submit' className='mt-6 py-2 px-6'>Create</button>
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

  return (
    <div className="flex flex-col top_1 w-[300px] text-gray-400 max-md:w-[95%] bg-red-700">
      <h1 className="text-2xl p-2">Friends List</h1>
      
      <div className="flex flex-col">

        <div className="flex items-center justify-between">

          <div className="flex relative justify-between">
            <input type="search" className="shadow border-0" placeholder="Search a friend..." />
            <button type="button" onClick={() => null} className='absolute left-[65%] mt-3 mr-4'>
              <BiSearchAlt2 size={20} />
            </button>
          </div>

          <div className="flex flex-col relative">

              <button type='button' className='outline-none' onClick={() => setOpen(!IsOpen)}>
                <BsThreeDotsVertical size={20} />
              </button>

            {IsOpen && (
              <div className="flex flex-col bg-blue-950 rounded-[10px] absolute top-[3rem] -left-[4rem] w-[120px] h-[120px] items-center justify-center text-white">

                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' onClick={ChannelCreation}>Invite a Friend</span>
                <span className='text-sm my-3 cursor-pointer border-b hover:text-gray-300 hover:border-gray-300' onClick={FriendInvitation}>Create a Channel</span>


              </div>
            )}
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