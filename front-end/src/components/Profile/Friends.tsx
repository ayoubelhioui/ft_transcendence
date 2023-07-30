import { ReactNode, useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle as PlusCircle } from 'react-icons/ai'


const Wrapper = ( {children} : {children : ReactNode} ) =>  {
  return (
      <div className="flex flex-col justify-between items-center w-[95%]">
          {children}
      </div>
      
  )
}

const Item = ({payload} : {payload : any}) => {
  const navigate = useNavigate();
  const user = payload

  const avatar = `http://${address}/users/image/${user.IntraId}`

  const itemOnClick = () => {
    navigate(`/Profile/${user.id}`)
  }

  return (
    <div onClick={itemOnClick} className="flex mt-3 items-center justify-between text-white w-full">
      <div className="flex items-center gap-2 w-full">
        <img src={avatar} className="w-[50px] h-[50px] rounded-[50%] object-cover" alt="" />
        <div className="w-1/2">{user.username}</div>
      </div>
    </div>
  )
}

const NoContent = () => {
  return (
      <Wrapper>
          <div className="flex mx-auto py-2 "> No Friends Found </div>
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
  const [result, effect] = appService.requestService.getUserFriends(userInfo.user.id, [])
  const isSearchingDone = useRef(true)
  const search = useRef('')
  const [r, setR] = useState('')
  let dataFiltered = useRef<Object[] | null>()

  
  /******** Filter List */

  effect()
  
  useEffect(() => {
    if (result.data && search.current.length > 0 && isSearchingDone.current) {
      isSearchingDone.current = false
      dataFiltered.current = [...result.data]
      dataFiltered.current = dataFiltered.current.filter((item : any) => {
        let name = item.username
        return name.toLowerCase().includes(search.current.toLowerCase())
      }
      );
      isSearchingDone.current = true
    } else if (result.data && search.current.length === 0) {
      dataFiltered.current = [...result.data]
    }
  }, [result.data])

  /**************************** */

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setR(e.target.value)
    search.current = (e.target.value)
  }

  return (
    <div className="flex flex-col top_1 w-[300px] text-gray-400 max-m-custom-md:w-[100%] max-sm:h-[280px] h-[550px] my-auto max-m-custom-md:h-[200px]">
      <div className="flex justify-around items-center">
        <h1 className="text-2xl">Friends List</h1>
        <button type='button' className='outline-none' onClick={undefined}>
          <PlusCircle size={30} className='text-white'/>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex relative justify-between items-center h-full">
            
       
              <input
                type="text"
                className="shadow border-0 my-4 mx-2 w-[280px] h-[40px] rounded-[10px]"
                placeholder="Search"
                name="search"
                onChange={handleInputChange}
              />
    
          
          </div>
        </div>

        {dataFiltered.current && dataFiltered.current.length ?
          <List list={dataFiltered.current}/>
          :
          <NoContent/>
        }

      </div>
    </div>
  )
}
export default Friends;
