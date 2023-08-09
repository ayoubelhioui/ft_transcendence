import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode} from "react";
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <>
            <div className=' min-h-[370px] max-custom-lg:min-h-[35vh] max-md:min-h-[270px] back rounded-[10px] flex-1 mr-16 max-custom-md:mr-0 flex flex-col justify-between shadow-md max-md:mr-0'>
                <h1 className="text-2xl p-2 mb-4">Live Games</h1>
                {children}
            </div>
        </>
    )
}

const Item = ({ item }: {item : any }) => {
    const player1 = item.player1
    const player2 = item.player2

    
    return (
        <div className="flex gap-4 w-full h-full justify-center items-start">
            <div className="flex mx-auto py-2 items-center bg-opacity-40">
                <Avatar src={`http://${address}/users/image/` + player1.id} sx={{ width: 60, height: 60 }} />
                <div className=" mx-12 flex items-center gap-2">
                <span>LIVE</span>
                <span className='w-[11px] h-[12px] rounded-[50%] bg-red-700'></span>
                </div>
                <Avatar src={`http://${address}/users/image/` + player2.id} sx={{ width: 60, height: 60 }}/>
            </div>
        </div>

    )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mx-auto h-full my-auto w-full justify-center items-center text-3xl text-gray-400"> No Lives </div>
        </Wrapper>
    )
}

const SeeMore = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Live');
      };

    return (
        <>
            <div className="flex justify-center cursor-pointer hover:animate-bounce" onClick={handleClick}>
                <span className='pb-[7px]'>See More</span>
                <SingleArrow size={25}/>
            </div>
        </>
    )
}

const List = ({lives} : {lives : any}) => {
    return (
        <Wrapper>
            {
                lives.slice(0, 3).map((item : any) => (            
                    <Item key={item.token} item={item}/>
                ))
            }

            {
                lives.length > 3 && <SeeMore/>
            }

        </Wrapper>
    )
}

export const Live = () => {
    const appService = useAppServiceContext()
    const response = appService.requestService.getLivesRequest()
    const result = response.state
    
    response.effect()
        
    if (result.status === STATUS_UNDEFINED) {
      return <div>Loading ...</div>
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
            return <List lives={result.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}
