import { useEffect, useState } from "react";
import { authContext } from "../context/useContext";
import axios from "axios";
import { address } from "../../Const";
import { makeGetRequest } from "../../Helpers";


// const TableComponent = () => {

  //   return (
    //     <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
    //       <div className="w-1/4">1</div>
    //       <div className="flex items-center gap-2 w-full">
    //         <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
    //         <div className="w-1/2">Mouad</div>
    //       </div>
    //       <div className="w-1/4 text-center">42%</div>
    //     </div>
    //   )
    // }



const LeaderBoardItem = ({rank, user} : {rank : number, user : any}) => {

  const avatar = `http://${address}/users/image/${user.IntraId}`

  return (
    <div className="flex mt-3 items-center justify-between bg-[#4D194D] py-3 px-4 rounded-[10px]">
    <div className="w-1/4">{rank}</div>
    <div className="flex items-center gap-2 w-full">
      <img src={avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
      <div className="w-1/2">{user.username}</div>
    </div>
    <div className="w-1/4 text-center">{user.winrate}</div>
  </div>
  )
}

const LeaderBoard = () => {

  const [players, req] = makeGetRequest(`http://${address}/games/leaderboard`, (error) => {
    console.log(error)
  })

  console.log(players);
  useEffect(() => {
    req();
  }, []);
      



  //? need to check if the array is empty and if it is then i will display there is nothing to show in here or something like that

  return (

    <div className="flex flex-col purple_back mt-[5%] w-[60%] mx-auto h-[65vh] max-md:mt-[3%] max-md:w-[85%] pb-5 max-sm:h-[80vh] max-sm:pb-4 max-custom-md:h-[70vh] max-custom-md:w-[85%]">
      <h1 className="text-white text-2xl mx-5 mt-5">LeaderBoard</h1>
      <div className="flex flex-col w-full pt-12 px-5 overflow-x-scroll">
        <div className="flex items-center justify-between back text-white py-2 px-4">
          <div className="w-1/4">Rank</div>
          <div className="w-[80%]">Name</div>
          <div className="w-1/5 text-center">WinRate</div>
        </div>
        
         
      {

        players.map((item : any, index : number) => (
        
              <LeaderBoardItem key={index} rank={index + 1} user={item}/> 
        ))

      }
          
      
      </div>
    </div>

    // <div className="flex back mt-[7%] w-[60%] mx-auto h-[60vh]">

    // </div>
    
  );
};

export default LeaderBoard;
