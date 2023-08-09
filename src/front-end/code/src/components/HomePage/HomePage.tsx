
// import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom';
import img from "../../assets/ping-pong-player-darkbg.png"
import FriendSection from './FriendSection'
// import { address } from '../../Const';
import { useAppServiceContext } from '../../Context/Service/AppServiceContext';
import { Live } from './Containers/Live';
import { Results } from './Containers/Results';
import { TopPlayers } from './Containers/TopPlayers';


const HomePage = () => {
  const appService = useAppServiceContext()
  const authUser = appService.authService

  return (
    <>
      <div className="flex">
        <div className=" rounded-[10px] w-[1400px] mx-auto">
          
          <div className="mt-4 max-custom-lg:mt-2 mx-4 max-sm:mx-1 h-[calc(300px_-_2rem)] max-custom-lg:h-[calc(280px_-_2rem)] max-sm:h-[calc(200px_-_1rem)] bg-image-bg bg-cover rounded-[25px]">
            <div className="   flex flex-row-reverse items-center justify-around max-sm:backdrop-blur-md">
              <div className="flex backdrop-blur-md w-[60%] max-sm:backdrop-blur-0 align-bottom  h-[calc(300px_-_2rem)] max-sm:h-[calc(200px_-_1rem)]">
                <img src={img} className=' -mt-[1rem] h-[350px] w-[350px] max-custom-lg:-mt-[2rem] max-custom-lg:w-[320px] max-custom-lg:h-[320px] max-sm:h-[220px] max-sm:w-[220px] max-sm:-mt-2 ml-auto'/>
              </div>
              <div className="flex flex-col text-center items-center gap-4 uppercase">
                <div className="text-white mask">
                  <h1 className='hide text-4xl max-sm:text-lg'>You Wanna Play Now! Click The Play Button Below</h1>
                </div>
                <div className="text-white mask mt-5 max-sm:mt-1">
                  <NavLink to="/Playthrough" className=' bg-purple-900 flex rounded-[10px] py-[12px] px-[40px] uppercase hide delay-[3s] max-sm:py-[7px] max-sm:px-[20px] max-sm:text-xs'>Play Now!</NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className=" text-white flex text-center w-[90%] max-custom-md:w-[75%] mx-auto mt-[3rem] max-md:w-[85%] max-custom-md:flex-col max-custom-md:gap-6 max-custom-lg:mt-3 max-sm:w-[95%]">
            <Live />
            <Results />
          </div>
          <TopPlayers />

        </div>

        <FriendSection />

      </div>
    </>
  )
  {/* </div> */}
}

export default HomePage