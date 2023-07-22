
import { authContext } from "../context/useContext";
import Avatar from '@mui/material/Avatar';
import {address} from '../../Const'
import { makeGetRequest } from "../../Helpers";
import { useEffect } from "react";


const MatchDiv = ({ result }: { result : any}) => {
	return (
		<div className="flex flex-wrap back h-[120px] w-[290px] hover:scale-105 transition-all duration-300">
			<div className="flex flex-col my-3 gap-4 w-full text-white px-4 ">
				<div className="flex gap-2 items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar alt="Avatar" src={`http://${address}/users/image/` + result.player1.IntraId} />
						<span className="text-gray-400">{result.player1.username}</span>
					</div>
					<span>{result.player1_score}</span>
				</div>
				<div className="flex gap-2 items-center w-full justify-between">
					<div className="flex items-center gap-2">
						<Avatar alt="Avatar" src={`http://${address}/users/image/` + result.player2.IntraId} />
						<span className="text-gray-400">{result.player2.username}</span>
					</div>
					<span>{result.player2_score}</span>
				</div>
			</div>
		</div>
	);
};
const ResultsLatestHome = () => {
	const auth = authContext();
  	
	const [latestResult, req] = makeGetRequest(`http://${address}/games/latestResult`, (error) => {
    console.log(error);
  });

  useEffect(() => {
    req()
  }, []); 

	return (
		<div className="flex flex-col purple_back mt-[5%] w-[70%] mx-auto h-[60vh] max-md:mt-[3%] max-md:w-[85%] pb-5 max-sm:pb-0 max-custom-md:w-[85%] max-custom-md:h-[75vh]">
			<h1 className="text-white text-3xl text-center mx-5 mt-5">Latest Results</h1>
			<div className="flex flex-wrap items-center justify-center mt-12 mx-5 gap-12 overflow-x-scroll">
				
			{
            latestResult.map((item: any, index: number) => (
              <MatchDiv key = {index} result={item}/>
            ))
          
          }

				
			</div>
		</div>
  	)
}

export default ResultsLatestHome