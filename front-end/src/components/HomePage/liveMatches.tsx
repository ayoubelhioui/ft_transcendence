import { authContext } from "../context/useContext";
// import {address} from '../../Const'

// import Avatar from '@mui/material/Avatar';


const LiveDiv = ({ image }: {image: string}) => {
    const auth = authContext();

    return (
        <div className="flex flex-wrap h-[190px] w-[260px] cursor-pointer ">
            <div className="flex bg-[url('/src/assets/table3d.png')] w-full h-[130px] rounded-[16px] bg-cover">
                {/* <img src={image} alt="Image_Type" className="w-[300px] object-cover h-[120px]"/> */}
            </div>
            <div className="flex justify-between px-2 items-center w-full back h-[40px]">
                <div className="flex flex-col items-center">
                    {/* <Avatar alt="Avatar" src={`http://${address}/user/image/` + auth.user?.IntraId} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base">mmounib</span>

                </div>
                <div className="flex flex-col items-center">
                     {/* <Avatar alt="Avatar" src={`http://${address}/user/image/` + auth.user?.IntraId} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base">mouad</span>
                </div>
            </div>
        </div>
    )
}

const liveMatches = () => {

    return (
        <div className="flex flex-col purple_back mt-[5%] w-[80%] mx-auto h-[60vh] max-md:mt-[3%] max-md:w-[85%] max-sm:h-screen pb-5 max-sm:pb-0 max-custom-md:w-[85%] max-custom-md:h-[75vh]">
            <h1 className="text-white text-2xl mx-5 mt-5">Live Games</h1>
            <div className="flex flex-wrap mt-12 mx-5 gap-12 overflow-x-scroll justify-around">
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
                <LiveDiv image="/src/assets/table3d.png"/>
            </div>
        </div>
    )
}

export default liveMatches
