
import { useState } from 'react';
import { AiOutlinePlusCircle as PlusCircle } from 'react-icons/ai'
import Chats from './Chats';
import { Channels } from '../..';
import CreateChannel from './CreateChannel';



const ChatsGroupsPanelTab = ({type} : {type : string}) => {
  if (type === 'Chats') {
    return (<Chats/>)
  } else if (type === 'Channels') {
    return (<Channels />)
  } else {
    throw Error("Wrong type")
  }
}

const ChatsGroupsPanel = () => {
  const [activeTab, setActiveTab] = useState('Chats');
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };



  return (
    <div className="top_2 col-span-1 row-span-2 max-m-custom-md:w-[300px] max-sm:hidden h-[750px] ">
        <div className="pt-1 flex w-full justify-between items-center">
            <input type="search" className="shadow border-0 text-white w-full" placeholder="Search a friend..." />
            <button type='button' className='outline-none' onClick={() => setIsOpen(true)}>
                <PlusCircle size={30} className='text-white'/>
            </button>
            <CreateChannel openState={[isOpen, setIsOpen]}/>
        </div>
        <div className="flex mt-4 flex-col">

            <div className="flex text-white justify-around items-center w-full border-solid border-y-[1px] border-y-gray-500 text-xl text-center">
            <h2
              className={`cursor-pointer ease duration-300 p-4 w-full ${
                activeTab === 'Chats' ? 'active_btn' : ''
              }`}
              onClick={() => handleTabClick('Chats')}
            >
                Chats
            </h2>
              <h2
                className={`cursor-pointer ease duration-300 p-4 w-full ${
                  activeTab === 'Channels' ? 'active_btn' : ''
                }`}
                onClick={() => handleTabClick('Channels')}>
                  Channels
              </h2>
            </div>

            <ChatsGroupsPanelTab type={activeTab} />
            
        </div>    
    </div>
  )
}

export default ChatsGroupsPanel;
