// import { motion } from 'framer-motion'

import { authContext } from './context/useContext';
import { Navigate } from 'react-router-dom';

import image from "../assets/ping-pong-player.png"
import image_2 from "../assets/headerBackground.png"

import Avatar from '@mui/material/Avatar';



const SignIn = () => {
  const authSign = authContext();
  
  if (!authSign.isAuthenticated)
  {
	  return (
		<div className=" w-full flex justify-center max-custom-md:flex-col gap-12 backdrop-blur-sm items-center h-full">
		  <div className="sign-animation w-[450px] max-sm:w-[350px] rounded-[10px] h-[400px] shadow-md pb-8 relative ">
			<Avatar src={image_2} sx={{ width: 85, height: 85 }} className='absolute mx-auto -top-[45px] saturate-50'/>
			<div className="flex justify-center items-end h-[75%]">
				<a href={import.meta.env.VITE_API} className='text-white bg-blue-950 rounded-[5px] py-3 px-12 flex items-center'>Sign In With<span className='pl-2 text-2xl'>42</span></a>
			</div>
			
		  </div>
		  <img src={image} alt="Ping_Player" className='w-[400px] max-custom-md:w-[450px] h-[400px] rounded-[10px] max-sm:w-[350px]'/>
		</div>
	  )

  }
  return <Navigate to="/" replace />;
}

export default SignIn;