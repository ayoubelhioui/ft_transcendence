
// import {useState} from "react";

const NotifComponent = () => {
    return (
        <div className="flex bg-gray-400 p-8 rounded-[10px] m-2">

        </div>
    );
}
const Notifications = () => {
    return (
        <div className=' overflow-x-scroll flex flex-col bg-blue-950 rounded-[10px]  absolute top-[5rem] w-[300px] h-[300px]'>
            <NotifComponent />
            <NotifComponent />
            <NotifComponent />
            <NotifComponent />
            <NotifComponent />
        </div>
    );
}

export default Notifications;