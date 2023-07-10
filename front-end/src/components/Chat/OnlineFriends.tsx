// import React from 'react'
import { authContext } from '../context/useContext';

const OnlineFriends = () => {
    const authApp = authContext();
    
    return (
    <div className="flex flex-col items-center max-md:hidden">
        <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
        <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
        <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
        <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
        <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
        <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
    </div>
  )
}

export default OnlineFriends
