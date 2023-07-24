import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode} from "react";
import { useAppServiceContext } from "../../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <>
          <div className=' max-md:mt-4 relative back min-h-[370px] max-md:min-h-[270px] rounded-[10px] flex-1 shadow-md flex flex-col justify-between overflow-x-auto'>
            <h1 className="text-2xl p-2">Latest Results</h1>
                {children}
          </div>
        </>
    )
}

const Item = ({ payload }: {payload : any}) => {
    return (
      <div className="flex gap-4 flex-col justify-center items-center">
        <div className="flex mx-auto cursor-pointer py-2 items-center bg-opacity-40">
                <Avatar src={`http://${address}/users/image/` + payload.player1.IntraId} sx={{ width: 60, height: 60 }}/>
                <div className=" mx-12 flex items-center gap-2">
                <span className='text-2xl px-4'>{payload.player1_score} / {payload.player2_score} </span>
                </div>
                <Avatar src={`http://${address}/users/image/` + payload.player2.IntraId} sx={{ width: 60, height: 60 }}/>
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

const SeeMore = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/results');
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

const List = ({list} : {list : any}) => {
    return (
        <Wrapper>
            {
                list.slice(0, 3).map((item : any) => (            
                    <Item key={item.token} payload={item}/>
                ))
            }

            {
                list.length > 3 && <SeeMore/>
            }

        </Wrapper>
    )
}

export const Results = () => {
    const appService = useAppServiceContext()
    const response = appService.requestService.getResultsRequest()
  
        
    if (response.status === STATUS_UNDEFINED) {
      return <div>Loading ...</div>
    } else if (response.status === STATUS_ERROR) {
      return (
        <>
        <div> Popup Error </div>
        <NoContent></NoContent>
        </>
      )
    } else if (response.status === STATUS_SUCCESS) {
        if (response.data.length === 0) {
            return <NoContent></NoContent>
        } else {
            return <List list={response.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}
