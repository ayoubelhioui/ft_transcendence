import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { VscAccount as AccountIcon, VscHome as HomeIcons } from "react-icons/vsc";
import { MdSource as MessageIcon, MdVideoLibrary as VideoIcon, MdSportsEsports as GameIcon, MdExitToApp as ExitIcon } from "react-icons/md";
import { authContext } from '../context/useContext';

const links: any = [
  {
    name: "Home",
    icon: <HomeIcons size={35}/>,
  },
  {
    name: "Profile",
    icon: <AccountIcon size={35}/>,
  },
  {
    name: "Chat",
    icon: <MessageIcon size={35}/>,
  },
  {
    name: "Live",
    icon: <VideoIcon size={35}/>,
  },
  {
    name: "Play",
    icon: <GameIcon size={35}/>,
  },

]

// const Styles: string = "after:absolute after:content-[''] after:bg-white after:h-[3px] after:w-0 after:left-0 after:-bottom-[5px] after:rounded-xl after:duration-500 hover:after:w-full";


const Navbar = () => {
  const authNav = authContext();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <div className=' nav-animate mt-auto py-6 bg-main-gradient p-4 mb-auto shadow-custom-shadowrotate-0 rounded-r-2xl max-md:p-2 max-md:hidden hover:transition-all'>
          <span className='text-white mb-2 text-lg mx-auto'>Navbar</span>
          <span className=' flex bg-white h-[1px] mt-6'></span>
          <div className='animate'>
            {!isHovering ? (
              <ul onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='mt-12 flex flex-col items-center cursor-pointer max-md:mt-8 '>
                
                  {links.map((link: any, index: number) => (
                    <li className='mb-14 max-md:mb-7' key={index} >

                      <NavLink
                        to={`/${link.name}`}
                        
                        className={` nav relative pb-3 text-white flex flex-row items-center`}>
                          {link.icon}
                      </NavLink>

                    </li>
                  ))}

              </ul>
            ) :
            <ul onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} className='mt-12 flex animate flex-col items-center cursor-pointer max-md:mt-8'>
                {links.map((link: any, index: number) => (
                  <li className='mb-14 max-md:mb-7 hover:transition-all' key={index} >
                    <NavLink
                      to={`/${link.name}`}
                      
                      className=' nav pb-3 text-white flex flex-row items-center '>
                        {link.icon}
                        <span className='pl-4'>{link.name}</span>
                    </NavLink>
                  </li>
                ))}
            </ul>
          }
          </div>
          
          {!isHovering ? (
              <div>

                <span className=' flex bg-white h-[1px] mt-12'></span>
                <NavLink to='/logout' className='text-white flex mt-8 items-center justify-center hover:items-start'>
                  <ExitIcon size={35} />
                </NavLink>
                
              </div>
          ) : 
            <div>

                <span className=' flex bg-white h-[1px] mt-12'></span>
                <NavLink to='/logout' className=' text-white flex mt-8 items-center justify-center hover:items-start cursor-pointer' onClick={authNav.logout} >
                  <ExitIcon size={35} />
                  <span className='pl-4'>Logout</span>
                </NavLink>
                  
            </div>
          }
      </div>
    </>
  )
}

export default Navbar
