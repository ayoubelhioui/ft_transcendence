import Avatar from '@mui/material/Avatar';

const FriendSection = ({image}: {image: string}) => {
  return (
    <div className="flex flex-col h-[100%] my-auto items-center gap-6 pt-4 bg-blue-950 bg-opacity-70 rounded-[10px] px-2 max-custom-md:hidden">
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
      <Avatar alt="Avatar" src={image} sx={{ width: 50, height: 50 }} className='cursor-pointer'/>
    </div>
  )
}

export default FriendSection