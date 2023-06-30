
// import { motion } from 'framer-motion'

import { Live, Results, TopPlayers } from './Container'
import img from "../../assets/ping-pong-player-darkbg.png"
import { authContext } from '../context/useContext'

// import { VscAccount as AccountIcon } from 'react-icons/vsc'

const HomePage = () => {
  const authUser = authContext();


  return (
    <>
      <div className=" rounded-[10px]">
        
        <div className="mt-4 mx-4 h-[calc(300px_-_2rem)] max-sm:h-[calc(200px_-_1rem)] bg-image-bg bg-cover rounded-[25px]">
          <div className=" backdrop-blur-md h-[calc(300px_-_2rem)] max-sm:h-[calc(200px_-_1rem)] flex justify-end w-[60%] ml-auto">
            <img src={img} className=' -mt-[1.7rem] h-[350px] w-[350px] max-sm:h-[220px] max-sm:w-[220px] max-sm:mt-0'/>
          </div>
        </div>
          {/* <div className=" rounded-t-[10px] h-[200px] contrast-75 saturate-75 bg-cover bg-no-repeat bg-center w-full bg-image-bg object-cover">

            <div className=" overflow-hidden h-full max-w-[1200px] mx-auto font-bold flex text-white justify-between px-[8rem] max-sm:px-[1rem] items-center ">
              <h1 className='heading text-white max-sm:hidden'>PING <br/> PONG</h1>
              <motion.button type='button' whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => null} className=' bg-[#BD6161] outline-none max-sm:mx-auto max-sm:mt-auto max-sm:mb-[5px] max-sm:px-[50px] max-sm:text-xs'>PLAY NOW!</motion.button>
            </div>

          </div> */}

          <div className=" text-white flex text-center w-[90%] mx-auto mt-[3rem] max-md:w-[85%] max-md:flex-col max-md:mt-3 ">
            <Live />
            <Results />
          </div>
          <TopPlayers />
      </div>
    </>
  )
  {/* </div> */}
}

export default HomePage
