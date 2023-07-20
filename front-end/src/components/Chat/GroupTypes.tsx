
import {RiArrowDropDownLine} from 'react-icons/ri'


const PublicGroup = ({text}: {text: string}) => {
    return (
        // Check if There is Public Groups and if it is then i will have to set the height {min-h-[200px]}
        <div className="flex flex-col gap-4 pt-2 overflow-x-scroll min-h-[160px]">
            <div className="flex justify-between px-2 py-1  items-center w-full text-blue-950 bg-white opacity-30 cursor-pointer">
                <span className='text-sm'>{text}</span>
                <RiArrowDropDownLine size={25} />
            </div>
        </div>
    )
}

// const ProtectedGroup = () => {

//   return (
//     <div className="flex"></div>
//   )
// }
const GroupTypes = () => {
  return (
    <div className='flex flex-col'>
      <PublicGroup text="Public Groups" />
      <PublicGroup text="Protected Groups" />
      <PublicGroup text="Private Groups" />
    </div>
  )
}

export default GroupTypes
