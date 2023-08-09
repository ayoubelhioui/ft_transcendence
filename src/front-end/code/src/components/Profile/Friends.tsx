import { ReactNode, useEffect, useRef, useState } from "react";
import { MdManageSearch } from "react-icons/md";
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle as PlusCircle } from 'react-icons/ai'
import { searchEffect } from "../Utils/utils";
import AddFriend from "./SearchUsers";


const Wrapper = ( {children} : {children : ReactNode} ) =>  {
  return (
      <div className="flex flex-col gap-4 justify-between items-center w-full ml-4 overflow-y-auto">
          {children}
      </div>
      
  )
}

const Item = ({payload} : {payload : any}) => {
  const appService = useAppServiceContext()
  const navigate = useNavigate();
  const user = payload

  const avatar = `http://${address}/users/image/${user.id}`

  const itemOnClick = () => {
    navigate(`/Profile/${user.id}`)
  }

  const itemOnClickDm = async () => {
    
  
    const bodyData = {
      name: "dm Channel",
      isGroup: false,
      targetUserId: user.id,
      visibility: "private"
    };

    const res = await appService.requestService.postCreateNewChannel(bodyData)
    if (res.status === STATUS_SUCCESS){
      navigate(`/Chat/${res.data.id}`)
    } else {
      //!error
    }
  }

  return (
    <div  className="flex mt-3 items-center justify-between max-custom-md:justify-around text-white w-[90%]">
      <div className="flex items-center gap-6 w-full">
        <img onClick={itemOnClick} src={avatar} className="w-[50px] h-[50px] cursor-pointer rounded-[50%] object-cover" alt="" />
        <div className="w-1/2 cursor-pointer">{user.username}</div>
      </div>
      <button onClick={itemOnClickDm} type="button" className="purple_back ml-1 py-1 px-4">DM</button>
    </div>
  )
}

const NoContent = () => {
  return (
      <Wrapper>
          <div className="flex mx-auto text-gray-400 justify-center items-center"> No Friends Found </div>
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




const Friends = ({userInfo} : {userInfo : any}) => {
  const appService = useAppServiceContext()
  const response = appService.requestService.getUserFriends()
  const result = response.state
  const search = searchEffect(result, (searchText : string, list : any[]) => {
    list = list.filter((item : any) => {
      let name = item.username
      return name.toLowerCase().includes(searchText.toLowerCase())
    });
    return (list)
  })

  response.effect([userInfo])
  search.commitEffect()
  search.filterEffect([result.data])

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    search.setSearch(e.target.value)
  }

  return (
    <div className="flex flex-col top_1 w-[300px] text-gray-400 max-m-custom-md:w-[100%] max-sm:h-[350px] max-sm:pb-2 h-[550px] my-auto max-m-custom-md:h-[200px] max-custom-md:h-[300px] max-custom-md:w-[100%]">
      <div className="flex justify-between px-4 py-2 items-center">
        <h1 className="text-2xl">Friends List</h1>
        <AddFriend />
      </div>

      <div className="flex flex-col max-sm:overflow-x-scroll">
        <div className="flex items-center justify-between ">
          <div className="flex relative justify-between items-center h-full ">
            
       
              <input
                type="text"
                autoComplete="off" 
                className="shadow border-0 my-4 mx-2 w-[280px] h-[40px] rounded-[10px]"
                placeholder="Search"
                name="search"
                onChange={handleInputChange}
              />
    
          
          </div>
        </div>

        {search.dataFiltered && search.dataFiltered.length ?
          <List list={search.dataFiltered}/>
          :
          <NoContent/>
        }

      </div>
    </div>
  )
}
export default Friends;
