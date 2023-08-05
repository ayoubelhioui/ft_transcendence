import React, { useEffect, useRef, useState } from "react";
import { useAppServiceContext } from "../../Context/Context"
import { STATUS_SUCCESS } from "../../Const";


const UserInfo = () => {
  const appService = useAppServiceContext()
  const intraId = appService.authService.user!.IntraId
  const newAvatar = useRef<File | undefined>(undefined);
  const name = useRef<string>('');

  const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
    name.current = e.target.value
  }


  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      newAvatar.current = event.target.files[0];
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', newAvatar.current as File);
    formData.append('username', name.current);
    const res = await appService.requestService.postUpdateUserInfo(intraId, formData)
    if (res.status === STATUS_SUCCESS) {
      window.location.reload()
    } else {
      //!popup
    }
  }

  return (
    <>
      <div className="w-[400px] m-auto rounded-[10px] flex flex-col h-[400px] text-white bg-blue-950">
        <h1 className="text-4xl text-center mt-4 text-white max-sm:text-xl">Your Preferences</h1>
        <form onSubmit={handleSubmit} className='flex items-center flex-col'>
          <div className="flex w-full flex-col mt-6">
            <label htmlFor="name_input" className="flex ml-5 text-white">
            Enter Your Nickname:
            </label>
            <input
              autoComplete="off" 
              type="name"
              className="py-3 rounded-[10px] w-[90%]"
              placeholder="Name"
              onChange={handleChangeName}
            />
          </div>
          
          <div className="flex items-start justify-center flex-col">
            <label htmlFor="file_input" className="flex ml-5 text-white">
              Upload Avatar:
            </label>
            <input autoComplete="off"  type="file" accept="image/*" onChange={handleImage} className="py-3 rounded-[10px] border-blue-950 border-2 w-[90%]" />
          </div>
    
          <button className="text-[#072964] w-[90%] justify-center text-xl max-sm:text-sm mt-4 max-sm:mt-2 flex bg-white font-bold" type="submit">Create</button>
        </form>
      </div>

    </>
  )
}

export default UserInfo;