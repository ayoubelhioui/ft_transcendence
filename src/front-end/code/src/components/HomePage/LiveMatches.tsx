import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight as RightArrowIcon, MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode} from "react";
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";
import three_image from '../../assets/table3d.png'
import classic_image from '../../assets/classic-game.png'

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
        <div className="flex flex-col purple_back mt-[4%] max-custom-lg:mt-[4%] w-[80%] max-custom-lg:w-[70%] mx-auto h-[60vh] max-custom-lg:h-[80vh] max-md:mt-[3%] max-md:w-[85%] max-sm:h-screen pb-5 max-sm:pb-0 max-sm:w-[95%] max-custom-md:w-[85%] max-custom-md:h-[75vh]">
            <h1 className="text-white text-2xl mx-5 mt-5">Live Games</h1>
            <div className="flex flex-wrap mt-12 mx-5 gap-12 overflow-x-scroll justify-around">
                {children}
            </div>
        </div>
    )
}

const Item = ({payload} : {payload : any}) => {
    const player1 = payload.player1
    const player2 = payload.player2
    const isClassic = !payload.type

    //console.log("payload", payload)

   

    const imagePath = isClassic ? three_image : classic_image

    //!link to the live

    return (
        <div className="flex flex-wrap h-[190px] w-[260px] cursor-pointer ">
           <div className={`flex  w-full h-[130px] rounded-[16px] bg-cover`} >
           <img src={imagePath} alt="Image_Type" className="w-full  h-full"/>
                
            </div>
            <div className="flex justify-between px-2 items-center w-full back h-[40px]">
                <div className="flex flex-col items-center">
                    <span className="text-white text-base">{player1.username}</span>

                </div>
                <div className="flex flex-col items-center">
                    <span className="text-white text-base">{player2.username}</span>
                </div>
            </div>
        </div>
    )
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex m-auto w-full h-[50vh] justify-center items-center text-4xl text-gray-400"> No friends playing right now!</div>
        </Wrapper>
    )
}


const List = ({list} : {list : any}) => {
    return (
        <Wrapper>
            {
                list.map((item : any, index : number) => (            
                    <Item key={item.token} payload={item}/>
                ))
            }
        </Wrapper>
    )
}

const LiveMatches = () => {
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
            return <List list={result.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}


export default LiveMatches;



