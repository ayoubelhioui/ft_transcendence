import { ReactNode, useEffect, useRef } from "react"
import { address } from "../../Const"
import { Avatar } from "@mui/material"


const Wrapper = ( {children} : {children : ReactNode} ) =>  {

  return (
    <div className=' overflow-x-scroll flex flex-col bg-blue-950 rounded-[10px] absolute top-[5rem] w-[300px] h-[300px]'>
          {children}
    </div>  
  )
}
  
const Item = ({payload} : {payload : any}) => {
    const item = payload;

    //! need to get user's avatar

    const avatar = `http://${address}/users/image/${item.IntraId}`

    return (
      <div className="flex bg-white bg-opacity-20 backdrop-blur-md rounded-[10px] m-2 h-[60px]">
          <div className="flex items-center mx-6 gap-4">
            <Avatar alt="Avatar" src={avatar} />
              {/* <img src={avatar} alt='avatar' className=' object-cover rounded-full w-[25px] h-[25px] cursor-pointer'/> */}
              <div className="flex flex-col cursor-pointer">
                  <h2 className='text-white text-base'>User's Name</h2>
                  <p className='text-white text-sm'>{item.message}</p>
              </div>
          </div>
      </div>
    )
}
  
const NoContent = () => {
  return (
      <Wrapper>
          <div className="flex mx-auto py-2 "> No Content </div>
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

const Notifications = ({setHandleNotif} : {setHandleNotif : any}) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    
    const handleClickOutside = (event : any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setHandleNotif(false)
      }
    };

    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 50)

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  })


  const data :any[] = [{
    message : "message",
    link : "link",
    type : "type",
    id : 0,
    user : Object()
    //other
  }]

  //! if fetching failed don't open notification or just display <NoContent />
  return (
      <div ref={ref}>
        <List list={data}/>
      </div>
  );
}

export default Notifications;
