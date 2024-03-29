import { Avatar, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight as RightArrowIcon, MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode} from "react";
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";

const SeeMore = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Leaderboard');
      };

    return (
        <>
            <div className="flex justify-between ">
                <h1 className='text-white text-2xl mx-4 my-2'>Top Players</h1>
                <RightArrowIcon size={35} onClick={handleClick} className=' text-white cursor-pointer hover:animate-pulse'/>
            </div>
        </>
    )
}

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <>
            <div className="flex flex-col top max-custom-lg:mt-[1vh] max-sm:h-[28%] max-custom-md:h-[25%] max-sm:mt-12 max-sm:mx-auto max-md:mx-4 max-md:mb-3 max-m-custom-md:mb-4">
                <SeeMore></SeeMore>
                <div className="flex gap-12 max-sm:gap-2 max-sm:overflow-y-scroll max-sm:flex-wrap">
                    {children}
                </div>
            </div>
        </>
    )
}

const Item = ({ payload }: {payload : any}) => {
    return (
        <div className="flex text-white justify-start mx-6 max-custom-md:mx-2 mt-4 gap-6 items-center overflow-x-auto">
            <div className="align">
                <Avatar src={`http://${address}/users/image/` + payload.id} alt={payload.username} sx={{ width: 85, height: 85 }}/>
                <span className="text-center mt-3 max-md:mt-1 text-xl max-sm:text-sm">{payload.username}</span>
                <span className=' w-full max-md:w-[55px] h-[1px] bg-white flex'></span>
                <span className='text-xl max-md:text-xs'>{payload.winrate}%</span>
            </div>
        </div>
    )
}

const NoContent = () => {
    return (
        <Wrapper>
          <h1 className='text-gray-400 text-4xl flex justify-center w-full items-center h-full mt-12'>
            There Is No Players, Yet!
          </h1>
        </Wrapper>
    )
}

const List = ({list} : {list : any}) => {
    return (
        <Wrapper>
            {
                list.map((player: any) => (
                    <Item key={player.id} payload={player}></Item>
                ))
            }
        </Wrapper>
    )
}

export const TopPlayers = () => {
    const appService = useAppServiceContext()
    const response = appService.requestService.getTopPlayersRequest()
    const result = response.state

    response.effect()
        
    if (result.status === STATUS_UNDEFINED) {
      return (
        <div className="w-full h-screen   flex-col flex text-white justify-start mx-6 max-custom-md:mx-2 mt-4 gap-6 items-center overflow-x-auto">
            <Skeleton className="h-2 w-5/6  my-2 bg-[#cccccc43]" height={50}/>
            <Skeleton className="h-2 w-5/6  my-2 bg-[#cccccc43]" height={50}/>
        </div>
      )
    } else if (result.status === STATUS_ERROR) {
      return (
        <>
        <div> Popup Error </div>
        <NoContent></NoContent>
        </>
      )
    } else if (result.status === STATUS_SUCCESS) {
        if (result.data.length === 0) {
            return <NoContent></NoContent>
        } else {
            return <List list={result.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}
