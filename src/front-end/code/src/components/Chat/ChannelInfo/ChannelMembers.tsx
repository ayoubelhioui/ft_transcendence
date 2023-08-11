import { useNavigate } from 'react-router-dom';
import { STATUS_SUCCESS, address } from '../../../Const';
import { RequestResultI } from '../../../Context/Service/RequestService';
import { ThreeButton } from './AdminMembers';
import { Avatar } from '@mui/material';



const Item = ({payload, myRule} : {payload : any, myRule : number}) => {
  const user = payload
  const navigate = useNavigate();
  const userId = user.id
  const avatar = `http://${address}/users/image/${userId}`

  const imageOnClick = () => {
    navigate(`/Profile/${payload.id}`)
  }

  return (
    <div className="flex items-center mt-5 ml-2 gap-4">
      <Avatar onClick={imageOnClick} src={avatar} alt={user.username} className=' object-cover rounded-full w-[35px] h-[35px]'/>
      <h2 className='text-white text-sm'>{user.username}</h2>
      <ThreeButton payload={payload} myRule={myRule} />
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
