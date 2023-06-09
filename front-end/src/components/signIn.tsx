import { motion } from 'framer-motion'
import { authContext } from './context/useContext';

const SignIn = () => {
  const authSign = authContext();

  const handleSignIn = () => { authSign.checkAuth() };

  return (
    <div className=" h-screen w-full flex justify-center items-center p-4 bg-profile-bg bg-cover bg-center backdrop-blur-md ">
      <div className="sign-animation w-[550px] rounded-[10px] border-neutral-950 h-[350px] flex justify-center items-end shadow-md backdrop-blur-xl bg-transparent pb-8">


        <a href="http://localhost:3000/auth/callback">Sign In With</a>
        
        {/* <motion.button type='button' whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} className='flex items-center text-white bg-fuchsia-900 shadow-inner outline-none'>

            Sign In With <span className='pl-2 text-2xl'>42</span>

        </motion.button> */}
      </div>
    </div>
  )
}

export default SignIn
