import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useAppServiceContext } from '../../Context/Context';



const FriendSection = () => {
  const appService = useAppServiceContext()

  useEffect(() => {
    const newFriendOnlineEvent = "newFriendOnline"
    const friendDisconnectEvent = "friendDisconnect"
    const myOnlineFriendsEvent = "myOnlineFriends"

    const fun = async () => {
      appService.socketService.on("newFriendOnline", (data : any) => {
        console.log("newFriendOnline", data)
        
      })

      appService.socketService.on("friendDisconnect", (data : any) => {
        console.log("friendDisconnect", data)

      })

      appService.socketService.on("myOnlineFriends", (data : any) => {
        console.log("myOnlineFriends", data)
      })

    }
    fun()

    return (() => {
      appService.socketService.off(newFriendOnlineEvent)
      appService.socketService.off(friendDisconnectEvent)
      appService.socketService.off(myOnlineFriendsEvent)
    })

  }, [])

  return (
    <div className="flex flex-col h-[100%] my-auto items-center gap-6 pt-4 bg-blue-950 bg-opacity-70 rounded-[10px] px-2 max-custom-md:hidden">
      {/* <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/> */}
    </div>
  )
}

export default FriendSection