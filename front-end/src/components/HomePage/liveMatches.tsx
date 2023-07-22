import { address, host } from "../../Const";
import axios from "axios";
import { authContext } from "../context/useContext";
import { error } from "console";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { makeGetRequest } from "../../Helpers";
// import {address} from '../../Const'

// import Avatar from '@mui/material/Avatar';



const LiveDiv = ({ isClassic, player1, player2 }: {isClassic: boolean, player1 : any, player2 : any}) => {
    const auth = authContext();

    const imagePath = isClassic ? "/src/assets/table3d.png" : "src/assets/classic-game.png"

    //!link to the live

    return (
        <div className="flex flex-wrap h-[190px] w-[260px] cursor-pointer ">
           <div className={`flex bg-[url('${imagePath}')] w-full h-[130px] rounded-[16px] bg-cover`} >
                {/* <img src={imagePath} alt="Image_Type" className="w-[300px] object-cover h-[120px]"/> */}
            </div>
            <div className="flex justify-between px-2 items-center w-full back h-[40px]">
                <div className="flex flex-col items-center">
                    <Avatar alt="Avatar" src={`http://${address}/users/image/` + player1.IntraId} sx={{ width: 30, height: 30 }}/>
                    <span className="text-white text-base">{player1.username}</span>

                </div>
                <div className="flex flex-col items-center">
                     <Avatar alt="Avatar" src={`http://${address}/users/image/` + player2.IntraId} sx={{ width: 30, height: 30 }}/>
                    <span className="text-white text-base">{player2.username}</span>
                </div>
            </div>
        </div>
    )
}

const liveMatches = () => {

    const [lives, req] = makeGetRequest(`http://${address}/games/live`, (error) => {
        console.log("Error ", error)
    })


    console.log(lives);



      useEffect(() => {
        req();
      }, []);

    

    if (false) {
        //!center load spinner
        return (<div></div>)
    } else {
        return (
            <div className="flex flex-col purple_back mt-[5%] w-[80%] mx-auto h-[60vh] max-md:mt-[3%] max-md:w-[85%] max-sm:h-screen pb-5 max-sm:pb-0 max-custom-md:w-[85%] max-custom-md:h-[75vh]">
                <h1 className="text-white text-2xl mx-5 mt-5">Live Games</h1>
                <div className="flex flex-wrap mt-12 mx-5 gap-12 overflow-x-scroll justify-around">
    

                    {
                      
                    
                        lives.map((item : any, index  : number) => (
                            
                            <LiveDiv key={item.token} isClassic={item.type} player1={item.player1} player2={item.player2}/>

                           
                        ))

                        

                    }

                    

                </div>
            </div>
        )

    }
}

export default liveMatches
