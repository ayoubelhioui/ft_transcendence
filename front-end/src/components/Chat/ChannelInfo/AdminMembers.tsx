import { useNavigate } from 'react-router-dom';
import { STATUS_SUCCESS, address } from '../../../Const';
import { RequestResultI } from '../../../Context/Service/RequestService';


const Item = ({payload} : {payload : any}) => {
  const user = payload
  const navigate = useNavigate();
  //!should return the IntraId
  const intraId = user.IntraId ?? -1
  const avatar = `http://${address}/users/image/${intraId}`

  const imageOnClick = () => {
    navigate(`/Profile/${payload.id}`)
  }

  return (
    <div className="flex items-center mt-5 ml-5 gap-2">
      <img onClick={imageOnClick} src={avatar} alt='ChannelS Avatar' className=' object-cover rounded-full w-[35px] h-[35px]'/>
      <h2 className='text-white text-sm'>{user.username}</h2>
    </div>
  )
}

const NoContent = () => {
  return (
      <div className="flex mx-auto py-2 "> No Friends Found </div>
  )
}


const List = ({list} : {list : any}) => {
  return (
      <>
          {
              list.map((item : any, index : number) => (            
                  <Item key={item.id} payload={item}/>
              ))
          }
      </>
  )
}

const AdminMembers = ({result}: {result : RequestResultI}) => {
  if (result.status === STATUS_SUCCESS) {
    if (result.data.length !== 0) {
      //!result.data.members
      return (
        <List list={result.data}/>
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

export default AdminMembers
