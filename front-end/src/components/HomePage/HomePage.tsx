// import React from 'react'
// import img from '../../assets/4312098.jpg'
import { motion } from 'framer-motion'

import { Live, Results, TopPlayers } from './Container'


const HomePage = () => {
  
  return (
    <div className=" home flex flex-col bg-secondary-gradient rounded-[10px] max-sm:rounded-none w-[80%] mx-auto max-w-[1400px] h-[75vh] max-md:w-[95%] max-sm:w-full max-sm:bg-none max-sm:drop-shadow-none max-sm:h-screen">
      
      <div className=" rounded-t-[10px] h-[200px] contrast-75 saturate-75 bg-cover bg-no-repeat bg-center w-full bg-image-bg object-cover">

        <div className=" overflow-hidden h-full max-w-[1200px] mx-auto font-bold flex text-white justify-between px-[8rem] max-sm:px-[1rem] items-center ">
          <h1 className='heading text-white max-sm:hidden'>PING <br/> PONG</h1>
          <motion.button type='button' whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => null} className=' bg-[#BD6161] outline-none max-sm:mx-auto max-sm:mt-auto max-sm:mb-[5px] max-sm:px-[50px] max-sm:text-xs'>PLAY NOW!</motion.button>
        </div>

      </div>

      <div className=" text-white flex text-center w-[85%] mx-auto mt-[4rem] max-md:w-[85%] max-md:flex-col max-md:mt-3">
        <Live />
        <Results />
      </div>
      <TopPlayers />
    </div>
  )
}

export default HomePage
