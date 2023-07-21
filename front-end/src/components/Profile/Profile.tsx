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
import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { address } from '../../Const';



const Profile = () => {
  const authApp = authContext();

  const [NewAvatar, setNewAvatar] = useState<File | null>(null);


  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
              setNewAvatar(event.target.files[0]);
        }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    
    setOpen(false);
  };


  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOpen(false);
    try {

        const formData = new FormData();
        
        formData.append('avatar', NewAvatar as File);

        console.log(formData.get('avatar'));

        const response = await axiosInstance.post(`/users/image/${authApp.user?.IntraId}`, formData, {
            headers: {
                Authorization: `Bearer ${authApp.accessToken}`
            }
          }
        );

        // ///////////////////   Temporary Solution In Here   /////////////////////

        {
          authApp.user && (authApp.user.avatar = response.data.avatar);
        }
        console.log( "here is image response:  " + response.data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex text-white mt-14 mx-8 justify-between max-m-custom-md:flex-col max-md:mt-8 max-sm:mt-14 backdrop-blur-md py-4 max-md:backdrop-blur-0 max-m-custom-md:w-[95%] max-m-custom-md:mx-auto">

        <div className="flex flex-col">
          <div className="flex items-center max-sm:justify-center max-sm:flex-col">
            <div className="flex justify-start">
              <img src={`http://${address}/users/image/` + authApp.user?.IntraId} alt='avatar' className=' object-cover rounded-full w-[130px] h-[130px]'/>
              <MdEdit size={20} className='cursor-pointer ' onClick={ () => setOpen(true) }/>

              { open &&
                (
                  
                  <Dialog open={open} onClose={handleClose}className="outline-none flex h-full w-full items-center justify-center">
                    <div className=" w-[25rem] bg-[#0e3c80] text-white">
                      <DialogTitle className='text-center'>Image Upload</DialogTitle>
                      <DialogContent>
                        <form onSubmit={handleClick} className='flex items-center flex-col'>
                          <input type="file" accept="image/*" onChange={handleImage} />
                          <button className="text-[#072964] flex items-center justify-center bg-white my-4 py-2 px-6" type="submit">Submit</button>
                        </form>
                      </DialogContent>
                    </div>
                  </Dialog>
                )
              }
            </div>
            <div className=" ml-8 max-sm:ml-0 max-sm:pt-2 flex flex-col text-gray-400 text-sm">
              <span className='max-sm:hidden'>Welcome</span>
              <h1 className='text-4xl m-1 pl-4 text-white max-sm:text-2xl max-sm:pl-0 max-sm:m-0'>{authApp.user?.username}</h1>
              <p className='max-sm:hidden'>Hey, {authApp.user?.username} ! how are you doing</p>
            </div>

          </div>
          <div className="flex mt-3 ml-2 max-md:ml-auto max-sm:mr-auto w-full">
            <Settings />
            
          </div>
        </div>

        <div className="flex ml-12 justify-around flex-1 flex-wrap max-m-custom-md:w-full text-center items-center max-w-[900px] max-m-custom-md:max-w-[95%] mx-auto  max-m-custom-md:ml-2 max-m-custom-md:mt-12 max-m-custom-md:pt-4 max-m-custom-md:border-t-2 max-m-custom-md:border-t-slate-400 max-m-custom-md:border-b-2 max-m-custom-md:border-b-slate-400 max-m-custom-md:pb-4">

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

      <div className="flex my-auto gap-4 flex-row-reverse mx-4 max-md:flex-col max-md:w-full max-m-custom-md:gap-6 max-md:gap-2 max-md:my-18 overflow-x-auto max-m-custom-md:flex-col max-sm:w-[95%]">
        <div className="flex flex-col gap-6 w-[70%] flex-1 max-m-custom-md:w-[100%]">
          <ResultsMatch />
          <Achievements />
        </div>
        <div className="flex flex-2 ">
          <Friends />
        </div>
      </div>
    </>

  )
}

export default Profile