// import { motion } from 'framer-motion'

import { authContext } from './context/useContext';
import { Navigate } from 'react-router-dom';


const SignIn = () => {
  const authSign = authContext();
  
  if (!authSign.isAuthenticated)
  {
	  return (
		<div className=" w-full flex justify-center items-center p-4 bg-profile-bg bg-cover bg-center backdrop-blur-md h-screen">
		  <div className="sign-animation w-[550px] rounded-[10px] border-neutral-950 h-[350px] flex justify-center items-end shadow-md backdrop-blur-xl bg-transparent pb-8">
	
			<a href={import.meta.env.VITE_API} className='text-white'>Sign In With<span className='pl-2 text-2xl'>42</span></a>
			
		  </div>
		</div>
	  )

  }
  return <Navigate to="/" replace />;
}

export default SignIn;