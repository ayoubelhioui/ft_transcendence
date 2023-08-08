import { useNavigate } from 'react-router-dom';
import { STATUS_SUCCESS, address } from '../../../Const';
import { RequestResultI } from '../../../Context/Service/RequestService';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { ThreeButton } from './AdminMembers';



const Item = ({payload, myRule} : {payload : any, myRule : number}) => {
  const user = payload
  const navigate = useNavigate();
  const userId = user.id ?? "UserDefaultImage.png" //!UserDefaultImage
  const avatar = `http://${address}/users/image/${userId}`
  const [isOpen, setIsOpen] = useState(false);

  const imageOnClick = () => {
    navigate(`/Profile/${payload.id}`)
  }

  return (
    <div className="flex items-center mt-5 ml-2 gap-4">
      <img onClick={imageOnClick} src={avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
      <h2 className='text-white text-sm'>{user.username}</h2>
      <div className="flex flex-col relative ml-auto mr-2">
          <BsThreeDotsVertical
            size={20}
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="flex flex-col bg-blue-950 items-center rounded-[10px] absolute top-[1.5rem] -left-[5rem] w-[120px] h-[180px] justify-center text-white">

                <ThreeButton payload={payload} myRule={myRule} />
            </div>
          )}
        </div>
    </div>
  )
}

const NoContent = () => {
  return (
      <div className="flex mx-auto h-screen w-full justify-center items-center text-3xl text-gray-400"> No Friends Found </div>
  )
}


const List = ({list, myRule} : {list : any, myRule : number}) => {
  return (
      <>
          {
              list.map((item : any, index : number) => (            
                  <Item key={item.id} payload={item} myRule={myRule}/>
              ))
          }
      </>
  )
}

const ChannelMembers = ({result, myRule}: {result : RequestResultI, myRule : number}) => {
  if (result.status === STATUS_SUCCESS) {
    if (result.data.length !== 0) {
      //!result.data.admins
      return (
        <List list={result.data.members} myRule={myRule}/>
      )
    } else {
      return (
        <NoContent />
      )
    }
  } else {
    return (
      <NoContent />
    )
  }
}

export default ChannelMembers
