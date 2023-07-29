import { ReactNode, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
  return (
      <div className="flex flex-col justify-between items-center w-[95%]">
          {children}
      </div>
      
  )
}

const Item = ({payload} : {payload : any}) => {
  const user = payload

    const avatar = `http://${address}/users/image/${user.IntraId}`

    return (
      <div className="flex mt-3 items-center justify-between text-white w-full">
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
  console.log("sad", list)
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

const Friends = () => {
  const [list, setList] = useState<Object[]>([])
  const appService = useAppServiceContext();
  const search = useRef("")
  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    search.current = e.target.value
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await appService.requestService.getUsersSearchRequest(search.current);

    if (result.status === STATUS_UNDEFINED) {
        //!loading
        setList([])
    } else if (result.status === STATUS_SUCCESS) {
        setList(result.data)
    } else if (result.status === STATUS_ERROR) {
        setList([])
        //!popup
    }

    console.log("Search ... ", search.current)
  }

  return (
    <div className="flex flex-col top_1 w-[300px] text-gray-400 max-m-custom-md:w-[100%] max-sm:h-[280px] h-[550px] my-auto max-m-custom-md:h-[200px]">
      <h1 className="text-2xl p-2">Friends List</h1>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex relative justify-between items-center">
            
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <input
              type="text"
              className="shadow border-0 my-4 mx-2 w-[250px] h-[40px] rounded-[10px]"
              placeholder="Search"
              name="search"
              onChange={handleInputChange}
            />
          </form>
           
          <BiSearchAlt2 size={20} />
          
          </div>
        </div>

        {list.length ?
          <List list={list}/>
          :
          <NoContent/>
        }

      </div>
    </div>
  )
}
export default Friends;
