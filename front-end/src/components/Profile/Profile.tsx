// import { VscAccount as AccountIcon } from 'react-icons/vsc'

import { motion } from 'framer-motion'
import Achievements from './Achievements'
import Friends from './Friends'
import ResultsMatch from './ResultsMatch'

import { authContext } from '../context/useContext';

// import TwoFactor from './twoFactor'
import Settings from './Settings';
import { useState } from 'react';


const Profile = () => {
  const authApp = authContext();
  const [factor, setFactor] = useState(false);


  return (
    <>
    {/* <div className=" home flex flex-col bg-profile-bg bg-cover bg-center drop-shadow-sm rounded-[10px] max-sm:rounded-none w-[80%] mx-auto max-w-[1400px] h-[70vh] max-sm:w-[100vw] max-md:w-[95%] max-md:h-[90vh] max-sm:h-[1200px]"> */}
      <div className="flex text-white mt-14 mx-8 justify-between max-md:flex-col max-md:mt-8 max-sm:mt-14 backdrop-blur-md py-4 max-md:backdrop-blur-0">

        <div className="flex flex-col">
          <div className="flex items-center max-sm:justify-center max-sm:flex-col">

            <img src={authApp.user?.avatar} alt='avatar' className=' object-cover rounded-full w-[130px] h-[130px]'/>
            <div className=" ml-8 max-sm:ml-2 flex flex-col text-gray-400 text-sm">
              <span className='max-sm:hidden'>Welcome</span>
              <h1 className='text-4xl m-1 pl-4 text-white max-sm:text-2xl max-sm:pl-0 max-sm:m-0'>{authApp.user?.username}</h1>
              <p className='max-sm:hidden'>Hey, {authApp.user?.username} ! how are you doing</p>
            </div>

          </div>
          <div className="flex mt-3 ml-2 max-md:ml-auto max-sm:mr-auto w-full">
            <Settings />
            {/* <motion.button type='button' whileTap={{scale: 0.955}} onClick={() => null} className='flex items-center bg-[#4D194D] py-2 px-6 mr-auto text-xs outline-none'> <MdEdit size={15} className='mr-1'/> Edit Profile</motion.button> */}
            { factor ?

              (<motion.button type='button' whileTap={{scale: 0.955}} onClick={() => setFactor(false)} className='flex items-center bg-[#4D194D] py-2 px-6 mr-auto text-xs outline-none'>Disable 2Fa</motion.button>) : 
              (<motion.button type='button' whileTap={{scale: 0.955}} onClick={() => setFactor(true)} className='flex items-center bg-[#4D194D] py-2 px-6 mr-auto text-xs outline-none'>Enable 2Fa</motion.button>)
            }
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
// </div>
}

export default Profile




{/* This is The BOX Design Of The Infos */}

{/* <div className="flex justify-around gap-16 ml-12 w-full text-center">
  <div className="flex flex-col gap-6 w-full max-w-xs">
    <div className=" back rounded-[10px] shadow-x  flex-1">
      <span className='text-4xl'>3</span>
      <h1 className='text-xl text-gray-400'>Achievements</h1>
    </div>
    <div className=" back rounded-[10px] shadow-xl flex-1">
      <span className='text-4xl'>17</span>
      <h1 className='text-xl text-gray-400'>Wins</h1>
    </div>
  </div>
  <div className="flex flex-col gap-6 w-full max-w-xs">
    <div className=" back rounded-[10px] shadow-xl flex-1">
      <span className='text-4xl'>8</span>
      <h1 className='text-xl text-gray-400'>Losses</h1>
    </div>
    <div className=" back rounded-[10px] shadow-xl flex-1">
      <span className='text-4xl'>3</span>
      <h1 className='text-xl text-gray-400'>Win Rate</h1>
    </div>
  </div>  
</div> */}