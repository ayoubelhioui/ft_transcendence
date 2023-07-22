

import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowRight as RightArrowIcon, MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { VscAccount as AccountIcon } from 'react-icons/vsc'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';


import { address, host, port } from '../../Const';
import { authContext } from '../context/useContext';
import { makeGetRequest } from '../../Helpers';


export const Live = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Live');
  };


  const LiveComponenet = ({ player1, player2 }: {player1 : any, player2 : any}) => {
      return (
        <div className="flex mx-auto py-2">
               <Avatar src={`http://${address}/users/image/` + player1.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2 cursor-pointer">
                <span className=''>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
              </div>
               <Avatar src={`http://${address}/users/image/` + player2.IntraId} sx={{ width: 60, height: 60 }}/>
            </div>
      )
  }


  const [lives, req] = makeGetRequest(`http://${address}/games/live`, (error) => {
        console.log("Error ", error)
    })



      useEffect(() => {
        req();
      }, []);

      
  if (lives.length === 0) {
    return (
      <div className=' min-h-[370px] max-md:min-h-[270px] back rounded-[10px] flex-1 mr-16 max-custom-md:mr-0 flex flex-col justify-between shadow-md max-md:mr-0'>
            <h1 className="text-2xl p-2">Live Games</h1>
            
            //!center no live
            <div className="flex mx-auto py-2 "> No Lives </div>
          
           
          </div>
    )
  } else {
    return (
      <div className=' min-h-[370px] max-md:min-h-[270px] back rounded-[10px] flex-1 mr-16 max-custom-md:mr-0 flex flex-col justify-between shadow-md max-md:mr-0'>
            <h1 className="text-2xl p-2">Live Games</h1>
            
            {
            lives.slice(0, 3).map((item : any) => (
                              
              <LiveComponenet key={item.token} player1={item.player1} player2={item.player2}/>
    
                          
          ))
          }

          //!see More

          {
            lives.length > 3 && 
            <div className="flex justify-center cursor-pointer hover:animate-bounce" onClick={handleClick}>
              <span className='pb-[7px]'>See More</span>
            <SingleArrow size={25}/>
          </div>
          }
           
          </div>
    )

  }

}

export const Results = () => {

  const ResultComponenet = ({result} : {result: any}) => {
    return (
      <div className="flex mx-auto cursor-pointer py-2 items-center bg-opacity-40">
              <Avatar src={`http://${address}/users/image/` + result.player1.IntraId} sx={{ width: 60, height: 60 }}/>
              <div className=" mx-12 flex items-center gap-2">
               <span className='text-2xl px-4'>{result.player1_score} / {result.player2_score} </span>
              </div>
              <Avatar src={`http://${address}/users/image/` + result.player2.IntraId} sx={{ width: 60, height: 60 }}/>
      </div>
    )
  }
	const navigate = useNavigate();

  const handleClick = () => {
    navigate('/results');
  };
	

  const [latestResult, req] = makeGetRequest(`http://${address}/games/latestResult`, (error) => {
    console.log(error);
  });

  useEffect(() => {
    req()
  }, []); 
    return (
        <div className=' max-md:mt-4 relative back min-h-[370px] max-md:min-h-[270px] rounded-[10px] flex-1 shadow-md flex flex-col justify-between overflow-x-auto'>
          <h1 className="text-2xl p-2">Latest Results</h1>
          <div className="flex gap-4 flex-col justify-center items-center">
            
          {
            latestResult.slice(0, 3).map((item: any, index: number) => (
              <ResultComponenet key = {index} result={item}/>
            ))
          
          }

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
          const response = await axios.get(`http://${address}/games/leaderboard`);

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
