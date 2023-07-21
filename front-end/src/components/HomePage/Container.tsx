

import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowRight as RightArrowIcon, MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { VscAccount as AccountIcon } from 'react-icons/vsc'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';


import { address } from '../../Const';
import { authContext } from '../context/useContext';


export const Live = () => {
  const auth = authContext();


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Live');
  };

  return (
    <div className=' min-h-[370px] max-md:min-h-[270px] back rounded-[10px] flex-1 mr-16 max-custom-md:mr-0 flex flex-col justify-between shadow-md max-md:mr-0'>
          <h1 className="text-2xl p-2">Live Games</h1>
          <div className=" flex gap-4 flex-col justify-center">
            <div className="flex mx-auto py-2">
               <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
               <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
            <div className="flex mx-auto py-2">
               <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
               <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
            <div className="flex mx-auto py-2">
               <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
               <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
          </div>
          <div className="flex justify-center cursor-pointer hover:animate-bounce" onClick={handleClick}>
            <span className='pb-[7px]'>See More</span>
            <SingleArrow size={25}/>
          </div>
        </div>
  )
}

export const Results = () => {

  const auth = authContext();

	const navigate = useNavigate();

  const handleClick = () => {
    navigate('/results');
  };
	
    return (
        <div className=' max-md:mt-4 relative back min-h-[370px] max-md:min-h-[270px] rounded-[10px] flex-1 shadow-md flex flex-col justify-between overflow-x-auto'>
          <h1 className="text-2xl p-2">Latest Results</h1>
          <div className="flex gap-4 flex-col justify-center items-center">
            <div className="flex mx-auto cursor-pointer py-2 items-center bg-opacity-40">
              <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl px-4'>1 / 2</span>
              </div>
              <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
            <div className="flex mx-auto cursor-pointer py-2 items-center">
              <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl px-4'>1 / 2</span>
              </div>
              <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
            <div className="flex mx-auto cursor-pointer py-2 items-center">
              <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl px-4'>3 / 2</span>
              </div>
              <Avatar src={`http://${address}/users/image/` + auth.user?.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
          </div>
		      <div className="flex justify-center cursor-pointer hover:animate-bounce" onClick={handleClick}>
            <span className='pb-[7px]'>See More</span>
			      <SingleArrow size={25} />
          </div>
        </div>
    )
  }

  export const TopPlayers = () => {
      const [Players, setPlayers] = useState<any>([]);

      const axiosReq = async () => {

        try {
          const response = await axios.get(`http://${import.meta.env.VITE_HOST}:3000/games/leaderboard`);

          setPlayers(response.data);

        } catch (error) {
          console.log("Error In LeaderBoard");
        }
      }

      useEffect(() => {
        axiosReq();
      }, []);
      

      const navigate = useNavigate();

      const handleClick = () => {
        navigate('/Leaderboard');
      };

      return (
          <div className="flex flex-col top max-sm:mt-12 max-sm:mx-2 max-md:mx-4 max-md:mb-3">
            <div className="flex justify-between ">
              <h1 className='text-white text-2xl mx-4 my-2'>Top Players</h1>
              <RightArrowIcon size={35} onClick={handleClick} className=' text-white cursor-pointer hover:animate-pulse'/>
            </div>
            {Players.length > 0 ? (
              <div className="flex text-white justify-start mx-6 max-custom-md:mx-2 mt-4 gap-6 items-center overflow-x-auto ">
                {Players.map((player: any) => (
                    <div key={player.id} className="align">
                      <Avatar src={`http://${address}/users/image/` + player.IntraId} sx={{ width: 85, height: 85 }}/>
                      <span className="text-center mt-3 max-md:mt-1 text-xl">{player.username}</span>
                      <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
                      <span className='text-xl max-md:text-xs'>{player.winrate}%</span>
                    </div>
                ))}
              </div>

            ) : 
              <h1 className='text-white text-4xl flex justify-center items-center h-full mt-12'>
                There Is No Players, Yet!
              </h1>
            }
          </div>
      )
  }
