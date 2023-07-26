import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight as SingleArrow  } from 'react-icons/md'
import { ReactNode, useState} from "react";
import { useAppServiceContext } from "../../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
      <div className="text-white flex flex-col  overflow-y-scroll scroll-smooth">
          {children}
      </div>
    )
}

const Item = ({payload} : {payload : any}) => {
  const channel = payload
  const avatar = `http://${address}/users/image/${channel.avatar}`
  
  const fun = () => {
    console.log(channel.name)
    //setUserName(channel.name)
  }

  //! render last message if exist
    return (
      <div className="flex mt-8 items-center mx-6" onClick={fun}>
          <img src={avatar} alt='avatar' className=' object-cover rounded-full w-[65px] h-[65px] cursor-pointer'/>
          <div className="flex flex-col ml-6 cursor-pointer">
            <h2 className='text-white'>{channel.name}</h2>
            <p className='pt-1 pl-2 text-gray-600'>user's message</p>
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


const List = ({list} : {list : any}) => {
    return (
      <Wrapper>
          {
              list.map((item : any, index : number) => (            
                  <Item key={item.id} payload={item}/>
              ))
          }
      </Wrapper>
      
    )
}

const Chats = () => {
    const appService = useAppServiceContext()
    const result = appService.requestService.getMyChannelsRequest()
  
    console.log("result === " , result);
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

export default Chats