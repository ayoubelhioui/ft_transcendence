// import { VscAccount as AccountIcon } from 'react-icons/vsc'

// import { motion } from 'framer-motion'
import Achievements from './Achievements'
import Friends from './Friends'
import ResultsMatch from './ResultsMatch'
import { MdEdit } from 'react-icons/md'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';




import { authContext } from '../context/useContext';
import Settings from './Settings';
import { useState } from 'react';
import axios from 'axios';



const Profile = () => {
  const authApp = authContext();

  const [NewAvatar, setNewAvatar] = useState<File | null>(null);

  const formData = new FormData();
            
  formData.append('avatar', NewAvatar as File);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
              setNewAvatar(event.target.files[0]);
        }
  };

  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    
    setOpen(false)
  };


  const handleClick = async () => {

    try {
        const response = await axios.post(`http://localhost:3000/user/${authApp.user?.intraId}`, formData, {
          headers: {
              Authorization: `Bearer ${authApp.accessToken}`
          }
        });

        console.log( "here is image response:  " + response.data);

        // need to take the URI of the image

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex text-white mt-14 mx-8 justify-between max-md:flex-col max-md:mt-8 max-sm:mt-14 backdrop-blur-md py-4 max-md:backdrop-blur-0">

        <div className="flex flex-col">
          <div className="flex items-center max-sm:justify-center max-sm:flex-col">
            <div className="flex justify-start">
              <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[130px] h-[130px]'/>
              <MdEdit size={20} className='cursor-pointer ' onClick={() => setIsClicked(true)}/>

              { isClicked &&
                (
                  <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Image Upload</DialogTitle>
                    <DialogContent>
                      <form onSubmit={handleClick}>
                        <input type="file" accept="image/*" onChange={handleImage} />
                        <button type='submit' className='outline-none'>Submit</button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )
              }
            </div>
            <div className=" ml-8 max-sm:ml-2 flex flex-col text-gray-400 text-sm">
              <span className='max-sm:hidden'>Welcome</span>
              <h1 className='text-4xl m-1 pl-4 text-white max-sm:text-2xl max-sm:pl-0 max-sm:m-0'>{authApp.user?.username}</h1>
              <p className='max-sm:hidden'>Hey, {authApp.user?.username} ! how are you doing</p>
            </div>

          </div>
          <div className="flex mt-3 ml-2 max-md:ml-auto max-sm:mr-auto w-full">
            <Settings />
            
          </div>
        </div>

        <div className="flex ml-12 justify-around flex-1 flex-wrap max-md:w-full text-center items-center max-w-[900px] mx-auto max-md:ml-2 max-md:mt-4 max-md:pt-4 max-md:border-t-2 max-md:border-t-slate-400 max-md:border-b-2 max-md:border-b-slate-400 max-md:pb-4">

          <div className="flex flex-col items-center">
            <span className='text-3xl max-sm:text-xl'>{authApp.user?.wins}</span>
            <h2 className=' opacity-70 text-2xl max-sm:text-lg'>Wins</h2>
          </div>
          <span className='w-[1px] h-[50px] bg-gray-400  max-md:hidden'></span>
          <div className="flex flex-col items-center">
            <span className='text-3xl max-sm:text-xl'>{authApp.user?.loss}</span>
            <h2 className=' opacity-70 text-2xl max-sm:text-lg'>Losses</h2>
          </div>
          <span className='w-[1px] h-[50px] bg-gray-400  max-md:hidden'></span>
          <div className="flex flex-col items-center">
            <span className='text-3xl max-sm:text-xl'>{authApp.user?.winrate}%</span>
            <h2 className=' opacity-70 text-2xl max-sm:text-lg'>Win Rate</h2>
          </div>

          

        </div>
        

      </div>

      <div className="flex my-auto gap-4 flex-row-reverse mx-4 max-md:flex-col max-md:w-full max-md:gap-2 max-md:my-18 overflow-x-auto">
        <div className="flex flex-col w-[70%] flex-1 max-md:w-[95%]">
          <ResultsMatch />
          <Achievements />
        </div>
        <div className="flex flex-2">
          <Friends />
        </div>
      </div>
    </>

  )
}

export default Profile