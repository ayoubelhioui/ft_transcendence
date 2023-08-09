import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import { NavLink } from 'react-router-dom'
import { VscAccount as AccountIcon, VscHome as HomeIcons } from "react-icons/vsc";
import { MdSource as MessageIcon, MdVideoLibrary as VideoIcon, MdSportsEsports as GameIcon, MdExitToApp as ExitIcon } from "react-icons/md";

import { IoIosNotificationsOutline as NotificationIcon } from 'react-icons/io'

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useEffect, useRef, useState } from 'react';
import Notifications from "./Notifications.tsx";

import { STATUS_ERROR, STATUS_SUCCESS, address } from '../../Const';
import { useAppServiceContext } from '../../Context/Service/AppServiceContext.tsx';



const links: any = [
  {
    name: "Home",
    icon: <HomeIcons size={30} className='text-white'/>,
  },
  {
    name: "Profile",
    icon: <AccountIcon size={30} className='text-white'/>,
  },
  {
    name: "Chat",
    icon: <MessageIcon size={30} className='text-white'/>,
  },
  {
    name: "FriendsPlaying",
    icon: <VideoIcon size={30} className='text-white'/>,
  },
  {
    name: "Playthrough",
    icon: <GameIcon size={30} className='text-white'/>,
  },

]


const Navbar = () => {
  const appService = useAppServiceContext();
  const authNav = appService.authService

  const [handleMenu, setHandleMenu] = useState(false);
  const [handleNotif, setHandleNotif] = useState(false);


  const hoverStyle: string = "hover:scale-125 hover:duration-500 ease-in-out";

  const logout = async () => {
    await authNav.logout()
    window.location.reload()
  }

  return (
    <>
      <div className="  text-white back rounded-[0] bg-blue-950 w-[60%] max-sm:w-[90%] mx-auto my-5 z-20">
        <ul  className=' py-2 flex items-center max-md:mt-1 max-md:justify-between '>
          <li className=' pl-3 max-sm:pl-1'>
            <NavLink to="/Profile">
              <img src={`http://${address}/users/image/` + authNav.user?.id} alt="" className=' cursor-pointer object-cover rounded-full w-[45px] h-[45px]' />
            </NavLink>
          </li>

         

          <li className= {`max-md:hidden`}>
            
            
            
              <NotificationIcon size={30} className='ml-6 text-white cursor-pointer' onClick={() => setHandleNotif(true)}/>
           

             

            { handleNotif && <Notifications setHandleNotif={setHandleNotif}/>}
          </li>

          <div className="flex mx-auto justify-between w-1/2 max-md:hidden">
          {links.map((link: any, index: number) => (
            <li className={`mx-auto ${hoverStyle}`} key={index} >
              <NavLink
                to={`/${link.name}`}
                
                className={`  text-white flex items-center`}>
                  <Tooltip title={`${link.name}`}>
                    <IconButton>
                      {link.icon}
                    </IconButton>
                  </Tooltip>
              </NavLink>
            </li>
          ))}
          </div>

          <NavLink to='/' className=' text-white cursor-pointer pr-2 max-md:hidden' onClick={logout} >

            <Tooltip title="Logout">
                <IconButton>
                  <ExitIcon size={35} className='text-white'/>
                </IconButton>
            </Tooltip>

          </NavLink>
          
          { !handleMenu ?
          <RiMenu3Line className=' hidden max-md:block mr-4' color='#fff' size={27} onClick={() => setHandleMenu(true)}/>
          : <RiCloseLine className=' hidden max-md:block mr-4' color='#fff' size={27} onClick={() => setHandleMenu(false)}/>
          }


          { handleMenu && (
            <div className=" absolute top-[4rem] h-screen bg-[#070757] w-screen -left-[6%] nav-animate">
              <div className="flex flex-col justify-center h-full px-4 py-2">
                {links.map((link: any, index: number) => (
                    <li className={`mx-auto ${hoverStyle} pt-12 text-2xl text-left`} key={index} >
                      <NavLink
                          to={`/${link.name}`}

                          className={`  text-white flex items-center`} onClick={ () => setHandleMenu(false)}>
                        {link.name}
                      </NavLink>
                    </li>
                ))}
                <NavLink to="/" onClick={logout} className={`mx-auto ${hoverStyle} pt-12 text-2xl text-left`}>
                  Logout
                </NavLink>
              </div>
            </div>
            )
          }

        </ul>
      </div>
    </>
  )

}

export default Navbar