import { motion } from 'framer-motion'

import { authContext } from './context/useContext';
import { Navigate } from 'react-router-dom';


const SignIn = () => {
  const authSign = authContext();
  
  if (!authSign.isAuthenticated)
  {
	  return (
		<div className=" w-full flex justify-center items-center p-4 bg-profile-bg bg-cover bg-center backdrop-blur-md h-screen">
		  <div className="sign-animation w-[550px] rounded-[10px] border-neutral-950 h-[350px] flex justify-center items-end shadow-md backdrop-blur-xl bg-transparent pb-8">
	
			<a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a03da0e6296d63a6c503040864e2f87ed71295125a6d30ac9b58b101c977867e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code
			" className='text-white'>Sign In With<span className='pl-2 text-2xl'>42</span></a>
			
		  </div>
		</div>
	  )

  }
  return <Navigate to="/" replace />;
}

export default SignIn