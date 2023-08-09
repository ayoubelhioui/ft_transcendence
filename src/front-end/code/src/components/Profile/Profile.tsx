// import { VscAccount as AccountIcon } from 'react-icons/vsc'

// import { motion } from 'framer-motion'
import Achievements from './Achievements'
import TwoFactor from "./TwoFactor";
import EditUserName from "./EditUserName";
import Friends from './Friends'
import ResultsMatch from './ResultsMatch'
import { MdEdit } from 'react-icons/md'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useRef, useState } from 'react';
import { STATUS_ERROR, STATUS_SUCCESS, address } from '../../Const';
import { useAppServiceContext } from '../../Context/Service/AppServiceContext';
import AxiosInstance from '../../Context/Service/AxiosInstance';
import { useParams } from 'react-router-dom';
import { UserI } from '../../Context/Service/AuthService';
import Relation from './Relation';
import { UserInfo } from '..';
import { Triggers } from '../../Context/Service/UtilService';


const ProfileUserName = ({userInfo} : {userInfo : any}) => {
  const userName = userInfo?.user?.username
  let welcome : any = {
    title : "Welcome",
    content : `Hey, ${userName} ! how are you doing`
  }
  if (userInfo?.relation)
    welcome = undefined

  return (
    <>
      <div className=" ml-8 max-sm:ml-0 max-sm:pt-2 flex flex-col text-gray-400 text-sm">
        <span className='max-sm:hidden'>{welcome?.title}</span>
        <h1 className='text-4xl m-1 pl-4 text-white max-sm:text-2xl max-sm:pl-0 max-sm:m-0'>{userName}</h1>
        <p className='max-sm:hidden'>{welcome?.content}</p>
      </div>
    </>
  )
}

const EditImage = () => {
  const appService = useAppServiceContext()
  const id = appService.authService.user!.id
  const [open, setOpen] = useState(false);
  const newAvatar = useRef<File | undefined>(undefined);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // customLog(clc.red("=================================================================>"));
    if (event.target.files) {
      //console.log("==========================================================++>");
      newAvatar.current = event.target.files[0];
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', newAvatar.current as File);
    const res = await appService.requestService.putUpdateUserImageRequest(id, formData)
    if (res.status === STATUS_SUCCESS) {
      window.location.reload()
    } else {
      //!popup
    }
  }

  return (
    <>
      <MdEdit size={20} className='cursor-pointer ' onClick={ () => setOpen(true) }/>           
      <Dialog open={open} onClose={() => setOpen(false)}className="outline-none flex h-full w-full items-center justify-center">
        <div className=" w-[25rem] bg-[#0e3c80] text-white">
          <DialogTitle className='text-center'>Image Upload</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} className='flex items-center flex-col'>
              <input autoComplete="off"  type="file" accept="image/*" onChange={handleImage} />
              <button className="text-[#072964] flex items-center justify-center bg-white my-4 py-2 px-6" type="submit">Submit</button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  )
}

const ProfileImage = ({userInfo} : {userInfo : any}) => {
  const id = userInfo?.user?.id
  const avatarLink = `http://${address}/users/image/${id}`
  const appService = useAppServiceContext()
  const isOnline = appService.socketService.isFriendOnline(id)
  const refreshProfileImageOfOnlineFriendTrigger = appService.utilService.addTrigger(Triggers.RefreshProfileImageOfOnlineFriend)

  useEffect(() => {

  }, [refreshProfileImageOfOnlineFriendTrigger])

  
  return (
    <>
      <div className="flex justify-start relative">
        <img src={avatarLink} alt='avatar' className=' object-cover rounded-full w-[130px] h-[130px]'/>
        { !(userInfo?.relation) && <EditImage/> }
        {
          isOnline === true && 
            <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute left-2 top-[1rem]"></span>
        }
        {
          isOnline === false &&
          <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-white absolute left-2 top-[1rem]"></span>
        }

      </div>
    </>
  )
}

const UserData = ({userInfo} : {userInfo : any}) => {
  return (
    <div className="flex my-auto gap-4 flex-row-reverse mx-4 max-custom-md:flex-col max-md:w-full max-m-custom-md:gap-6 max-md:gap-2 max-md:my-18 overflow-x-auto max-sm:w-[95%]">
      <div className="flex flex-col gap-6 w-[70%] flex-1 max-m-custom-md:w-[100%]">
        <ResultsMatch userInfo={userInfo}/>
        <Achievements userInfo={userInfo}/>
      </div>
      <div className="flex flex-2 ">
        <Friends userInfo={userInfo} />
      </div>
    </div>
  )
}

const UserProfile = ({userInfo} : {userInfo : any}) => {
  const wins =  userInfo?.user?.wins
  const loss =  userInfo?.user?.loss
  const win_rate =  userInfo?.user?.winrate
  const [, setUserName] = useState('')


  return (
    <>
      <div className="flex text-white mt-14 max-custom-lg:mt-8 mx-8 justify-between max-m-custom-md:flex-col max-md:mt-8 max-sm:mt-14 backdrop-blur-md py-4 max-md:backdrop-blur-0 max-m-custom-md:w-[95%] max-m-custom-md:mx-auto">

        <div className="flex flex-col">
          <div className="flex items-center max-sm:justify-center max-sm:flex-col">
            <ProfileImage userInfo={userInfo}/>
            <ProfileUserName userInfo={userInfo} />
          </div>
          <div className="flex mt-3 ml-2 max-md:ml-auto max-sm:mr-auto w-full">
            { !userInfo?.relation ?
              <>
                <EditUserName setUserName={setUserName}/>
                <TwoFactor />
              </>
              :
              <>
                <Relation relation={userInfo.relation}/>
              </>
            }
          </div>
        </div>

        <div className="flex ml-12 justify-around max-custom-lg:mx-auto flex-1 flex-wrap max-m-custom-md:w-full text-center items-center max-w-[900px] max-m-custom-md:max-w-[95%] mx-auto  max-m-custom-md:ml-2 max-m-custom-md:mt-12 max-m-custom-md:pt-4 max-m-custom-md:border-t-2 max-m-custom-md:border-t-slate-400 max-m-custom-md:border-b-2 max-m-custom-md:border-b-slate-400 max-m-custom-md:pb-4">

          <div className="flex flex-col items-center">
            <span className='text-3xl max-sm:text-xl'>{wins}</span>
            <h2 className=' opacity-70 text-2xl max-sm:text-lg'>Wins</h2>
          </div>
          <span className='w-[1px] h-[50px] bg-gray-400  max-md:hidden'></span>
          <div className="flex flex-col items-center">
            <span className='text-3xl max-sm:text-xl'>{loss}</span>
            <h2 className=' opacity-70 text-2xl max-sm:text-lg'>Losses</h2>
          </div>
          <span className='w-[1px] h-[50px] bg-gray-400  max-md:hidden'></span>
          <div className="flex flex-col items-center">
            <span className='text-3xl max-sm:text-xl'>{win_rate}%</span>
            <h2 className=' opacity-70 text-2xl max-sm:text-lg'>Win Rate</h2>
          </div>
        </div>
      </div>
      
      { userInfo && <UserData userInfo={userInfo}/> }
      
    </>

  )
}

const Profile = () => {
  const appService = useAppServiceContext()
  const params = useParams();
  
  let id = params.id ? +params.id : undefined
  if (id === appService.authService.user?.id)
    id = undefined
  const response = appService.requestService.getUserWithRelation(id)
  //!Unauthorized
  const result = response.state

  const refreshProfile = appService.utilService.addTrigger(Triggers.RefreshProfile)
  response.effect([id, refreshProfile])
  
  let userInfo = result.data
  if (result.status === STATUS_ERROR && result.message === "profile") {
    userInfo = {
      user : appService.authService.user!,
      relation : undefined,
    }
  }


  return <UserProfile userInfo={userInfo}/>
}

export default Profile
