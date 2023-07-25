import Avatar from '@mui/material/Avatar';

const FriendSection = ({image}: {image: string}) => {
  return (
    <div className="flex flex-col h-[600px] my-auto mx-auto items-center gap-4 pt-2 bg-slate-400 opacity-50 rounded-[10px] w-[60px] max-custom-md:hidden">
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
      <Avatar alt="Avatar" src={image} sx={{ width: 40, height: 40 }} />
    </div>
  )
}

export default FriendSection