// import React from 'react'
import { useAppServiceContext } from '../../Context/Context';

const OnlineFriends = () => {
  const appService = useAppServiceContext()
  const authApp = appService.authService;
    
    return (
    <div className="flex flex-col items-center">
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
