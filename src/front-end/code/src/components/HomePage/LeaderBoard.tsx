import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode} from "react";
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <div className="flex flex-col purple_back max-custom-lg:mt-[3.5%] max-custom-lg:h-[80%] w-[70%] mx-auto h-[65vh] max-md:mt-[3%] max-md:w-[85%] pb-5 max-sm:h-[90vh] max-sm:w-[95%] max-sm:pb-4 max-custom-md:h-[70vh] max-custom-md:w-[85%]">
          <h1 className="text-white text-2xl mx-5 mt-5">LeaderBoard</h1>
          <div className="flex flex-col w-full pt-12 px-5 overflow-x-scroll">
            <div className="flex items-center justify-between back text-white py-2 px-4">
              <div className="w-1/4">Rank</div>
              <div className="w-[80%]">Name</div>
              <div className="w-1/5 text-center">WinRate</div>
            </div>
                  {children}
          </div>
        </div>
        
    )
}

const Item = ({payload, rank} : {payload : any, rank : number}) => {
  const user = payload

    const avatar = `http://${address}/users/image/${user.id}`

    return (
      <div className="flex mt-3 items-center justify-between text-white bg-[#4D194D] py-3 px-4 rounded-[10px]">
        <div className="w-1/4">{rank}</div>
        <div className="flex items-center gap-2 w-full">
          <img src={avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
          <div className="w-1/2">{user.username}</div>
        </div>
        <div className="w-1/4 text-center">{user.winrate}%</div>
      </div>
    )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mx-auto h-screen w-full justify-center items-center text-4xl text-gray-400"> No Users Currently! </div>
        </Wrapper>
    )
}


const List = ({list} : {list : any}) => {
    return (
        <Wrapper>
            {
                list.map((item : any, index : number) => (            
                    <Item key={index} payload={item} rank={index + 1}/>
                ))
            }
        </Wrapper>
    )
}

const LeaderBoard = () => {
    const appService = useAppServiceContext()
    const response = appService.requestService.getTopPlayersRequest()
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
            return <List list={result.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}


export default LeaderBoard;
