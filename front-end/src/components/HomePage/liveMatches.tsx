import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight as RightArrowIcon, MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode} from "react";
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <div className="flex flex-col purple_back mt-[5%] w-[80%] mx-auto h-[60vh] max-md:mt-[3%] max-md:w-[85%] max-sm:h-screen pb-5 max-sm:pb-0 max-custom-md:w-[85%] max-custom-md:h-[75vh]">
            <h1 className="text-white text-2xl mx-5 mt-5">Live Games</h1>
            <div className="flex flex-wrap mt-12 mx-5 gap-12 overflow-x-scroll justify-around">
                {children}
            </div>
        </div>
    )
}

const Item = ({payload} : {payload : any}) => {
    const isClassic : boolean = payload.isClassic
    const player1 = payload.player1
    const player2 = payload.player2

    const imagePath = isClassic ? "/src/assets/table3d.png" : "/src/assets/classic-game.png"

    //!link to the live

    return (
        <div className="flex flex-wrap h-[190px] w-[260px] cursor-pointer ">
           <div className={`flex bg-[url('${imagePath}')] w-full h-[130px] rounded-[16px] bg-cover`} >
                {/* <img src={imagePath} alt="Image_Type" className="w-[300px] object-cover h-[120px]"/> */}
            </div>
            <div className="flex justify-between px-2 items-center w-full back h-[40px]">
                <div className="flex flex-col items-center">
                    {/* <Avatar alt="Avatar" src={`http://${address}/users/image/` + player1.IntraId} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base">{player1.username}</span>

                </div>
                <div className="flex flex-col items-center">
                     {/* <Avatar alt="Avatar" src={`http://${address}/users/image/` + player2.IntraId} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base">{player2.username}</span>
                </div>
            </div>
        </div>
    )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mx-auto py-2 "> No Lives </div>
        </Wrapper>
    )
}


const List = ({lives} : {lives : any}) => {
    return (
        <Wrapper>
            {
                lives.map((item : any, index : number) => (            
                    <Item key={item.token} payload={item}/>
                ))
            }
        </Wrapper>
    )
}

const LiveMatches = () => {
    const appService = useAppServiceContext()
    const lives = appService.requestService.getLivesRequest()
  
        
    if (lives.status === STATUS_UNDEFINED) {
      return <div>Loading ...</div>
    } else if (lives.status === STATUS_ERROR) {
      return (
        <>
        <div> Popup Error </div>
        <NoContent></NoContent>
        </>
      )
    } else if (lives.status === STATUS_SUCCESS) {
        if (lives.data.length === 0) {
            return <NoContent></NoContent>
        } else {
            return <List lives={lives.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}


export default LiveMatches;



