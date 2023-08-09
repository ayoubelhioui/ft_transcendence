import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { useAppServiceContext } from '../../Context/Service/AppServiceContext';
import { address } from '../../Const';
import { Triggers } from '../../Context/Service/UtilService';


const Item = ({item} : {item : any}) => {
  const user = item
  const image = `http://${address}/users/image/${user.id}`

  //console.log(item)
  return (
    <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
  )
}

const List = ({list} : {list : any}) => {
  return (
    <>
    {
      list.map((item : any, index : number) => (
          <Item key={index} item={item}/>
      ))
    }
    </>
  )
}

const FriendSection = () => {
  const appService = useAppServiceContext()
  const listFriends = appService.socketService.listFriends

  const refreshListFriendTrigger = appService.utilService.addTrigger(Triggers.RefreshListFriend)
  useEffect(() => {
  }, [refreshListFriendTrigger])

  return (
    <div className="flex flex-col h-[100%] my-auto items-center gap-6 pt-4 bg-blue-950 bg-opacity-70 rounded-[10px] px-2 max-custom-md:hidden">
      <List list={listFriends} />
    </div>
  )
}

export default FriendSection