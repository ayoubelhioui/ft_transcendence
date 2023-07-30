import { ReactNode } from "react"
import { address } from "../../Const"


const Wrapper = ( {children} : {children : ReactNode} ) =>  {
  return (
    <div className=' overflow-x-scroll flex flex-col bg-blue-950 rounded-[10px] absolute top-[5rem] w-[300px] h-[300px]'>
          {children}
    </div>  
  )
}
  
const Item = ({payload} : {payload : any}) => {
    const item = payload
    //const avatar = `http://${address}/users/image/${item.IntraId}`

    return (
      <div className="flex bg-white opacity-20 backdrop-blur-md p-8 rounded-[10px] m-2">
          {/* <div className="flex my-4 items-center mx-6 gap-4" onClick={onItemClick}>
              <img src={avatar} alt='avatar' className=' object-cover rounded-full w-[50px] h-[50px] cursor-pointer'/>
              <div className="flex flex-col cursor-pointer">
                  <h2 className='text-white'>{channel.name}</h2>
                  <LastMessage message={channel.lastMessage} />
              </div>
          </div> */}
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

const Notifications = () => {
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
       <List list={data} />
    );
}

export default Notifications;
