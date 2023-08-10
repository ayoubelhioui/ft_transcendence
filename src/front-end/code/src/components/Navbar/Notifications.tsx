import { ReactNode, useEffect, useRef } from "react"
import { STATUS_SUCCESS, address } from "../../Const"
import { Avatar } from "@mui/material"
import { useAppServiceContext } from "../../Context/Service/AppServiceContext"
import { UserI } from "../../Context/Service/AuthService";
import { send } from "process";
import { useNavigate } from "react-router-dom";
import { Triggers } from "../../Context/Service/UtilService";
// import {acceptImage} from '../../assets/accept.png'

export interface INotification {
  id: number;
  message : string
  acceptLink : string;
  acceptMethod : string;
  refuseLink : string;
  refuseMethod : string;
  time : Date;
  seen : boolean;
  //receiver : UserI;
  sender : UserI;
}

const Wrapper = ( {children} : {children : ReactNode} ) =>  {

  return (
    <div className=' overflow-x-scroll flex flex-col bg-blue-950 rounded-[10px] absolute top-[5rem] w-[300px] h-[300px]'>
          {children}
    </div>  
  )
}
  
const Item = ({payload, setHandleNotif} : {payload : any, setHandleNotif : any}) => {
  const appService = useAppServiceContext()
  const navigate = useNavigate()
  const item : INotification = payload;

  //! need to get user's avatar

  const avatar = `http://${address}/users/image/${item.sender?.id}`

  const acceptClick = async () => {
    if (item.acceptMethod === "PUT") {
      navigate(`/Profile/${item.sender.id}`)
      setHandleNotif(false)
    } else {
      const res = await appService.requestService.acceptNotification(item.acceptMethod, item.acceptLink)
      if (res?.status === STATUS_SUCCESS) {
        const deleteRes = await appService.requestService.deleteNotification(item.id)
        if (deleteRes.status === STATUS_SUCCESS) {
          appService.socketService.deleteNotification(item.id)
        } 
        setHandleNotif(false)
      } else {
        setHandleNotif(false)
        //!error
      }
    }
  }

  //console.log("g", item)
  return (
    <div className="flex bg-white bg-opacity-20 backdrop-blur-md rounded-[10px] m-2 h-[60px]">
        <div className="flex items-center mx-[.8rem] gap-4">
          <Avatar alt="Avatar" src={avatar} />
            {/* <img src={avatar} alt='avatar' className=' object-cover rounded-full w-[25px] h-[25px] cursor-pointer'/> */}
            <div className="flex cursor-pointer items-center justify-between">
                <div className="flex flex-col">
                  <h2 className='text-white text-base'>{item.sender?.username}</h2>
                  <p className='text-white text-xs'>{item.message}</p>
                </div>
                {/* <img src={acceptImage} alt="" /> */}
                { item.acceptLink && item.acceptMethod === "POST" && 
                  <span onClick={acceptClick} className="text-white font-bold ">accept</span>
                }
                { item.acceptLink && item.acceptMethod === "PUT" && 
                  <span onClick={acceptClick} className="text-white font-bold ">go too profile</span>
                }
            </div>
        </div>
    </div>
  )
}
  

const List = ({list, setHandleNotif} : {list : any, setHandleNotif : any}) => {
  return (
      <Wrapper>
          {
              list.map((item : any, index : number) => (            
                  <Item key={item.id} payload={item} setHandleNotif={setHandleNotif} />
              ))
          }
      </Wrapper>
  )
}

const Notifications = ({setHandleNotif} : {setHandleNotif : any}) => {
  const appService = useAppServiceContext()
  const refreshNotificationTrigger = appService.utilService.addTrigger(Triggers.RefreshNotification)
  const data :any[] = [... appService.socketService.listNotification].reverse()
  const ref = useRef<any>(null)


  useEffect(() => {

  }, [refreshNotificationTrigger])

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

  return (
      <div ref={ref}>
        <List list={data} setHandleNotif={setHandleNotif}/>
      </div>
  );
}

export default Notifications;
