
import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useAppServiceContext } from "../../../Context/Context";
import { STATUS_SUCCESS } from "../../../Const";



const DropList = ({selectedGroupType, setSelectedGroupType} : {selectedGroupType: any, setSelectedGroupType : any}) => {
  const [isOpen, setIsOpen] = useState(false);

  const Item = ({name} : {name : string}) => {
    return (
      <li
        className="mt-2 hover:outline hover:outline-sky-700 cursor-pointer"
        onClick={() => {setSelectedGroupType(name)}}
      >
        name
      </li>
    )
  }

return (
  <>
    <label htmlFor="name_input" className="flex ml-5 text-white">
      Group's Type:
    </label>
    <div className="flex flex-col items-center justify-center mx-5 mt-4">
      <div
        className="bg-blue-950 rounded-[10px] p-2 flex text-white border items-center w-full border-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedGroupType || "Select Type"}
        <RiArrowDropDownLine size={25} />
      </div>

      <ul
        className={`rounded-[10px] bg-white text-center flex flex-col text-blue-950 font-semibold ${
          isOpen ? "block" : "hidden"
        } w-full p-2`}
      >
        <Item name={"Public"} />
        <Item name={"Protected"} />
        <Item name={"Private"} />
      </ul>
    </div>
  </>
)
}


const AvatarInput = ({avatar} : {avatar : React.MutableRefObject<File | null>}) => {
  
  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      avatar.current = (event.target.files[0]);
    }
  };

  return (
    <div className="flex items-start justify-center flex-col">
      <label htmlFor="file_input" className="flex ml-5 text-white">
        Upload Avatar:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatar}
        className="py-3 rounded-[10px] border-blue-950 border-2 "
      />
    </div>
  )
}

const NameField = ({name} : {name : React.MutableRefObject<string>}) => {
  const handleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    name.current = e.target.value
  }

  return (
    <div className="flex items-start justify-center flex-col mt-6">
      <label htmlFor="name_input" className="flex ml-5 text-white">
      Group's Name:
      </label>
      <input
        type="name"
        className="py-3 rounded-[10px]"
        placeholder="Name"
        onChange={handleChangePassword}
      />
    </div>
  )
}

const PasswordField = ({password} : {password : React.MutableRefObject<string>}) => {
  const handleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    password.current = e.target.value
  }

  return (
    <div className="flex items-start justify-center flex-col mt-6">
      <label htmlFor="name_input" className="flex ml-5 text-white">
        Enter Password:
      </label>
      <input
        type="password"
        className=" py-3 rounded-[10px] w-[90%]"
        placeholder="password"
        onChange={handleChangePassword}
      />
    </div>
  )
}

const CreateChannel = ({openState} : {openState : [boolean, React.Dispatch<React.SetStateAction<boolean>>]}) => {
  const appService = useAppServiceContext()
  const [isOpen, setIsOpen] = openState;
  const [selectedGroupType, setSelectedGroupType] = useState<string | undefined>(undefined)
  const password = useRef('')
  const name = useRef('')
  const avatar = useRef<File | null>(null)


  const validator = () => {
    if (!selectedGroupType)
      return (false)
    if (name.current.trim().length === 0)
      return (false)
    if (selectedGroupType === "Protected" && password.current.trim().length === 0)
      return (false)
    return (true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validator()) {
      const bodyData = {
        name: name.current,
        password : password.current,
        NewAvatar : avatar.current,
        visibility: selectedGroupType!.toLowerCase(),
      };


      const res = await appService.requestService.postGroupImageRequest(bodyData)
      if (res.status === STATUS_SUCCESS) {
        console.log("Channel Created ")
      } else {
        //!popup
      }
    } else {
      //!error
    }
  }

  return (
    <div className="">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex h-full w-full items-center justify-center"
      >
        <div className="w-[400px] flex flex-col justify-center items-center overflow-hidden h-[500px] text-white bg-blue-950">
          <DialogTitle className="text-center text-xl">
            Create a Channel
          </DialogTitle>
          <DialogContent>
            
            <form onSubmit={handleSubmit} className="flex flex-col mt-4">
              

              <NameField name={name} />
              <AvatarInput avatar={avatar} />
              <DropList selectedGroupType={selectedGroupType} setSelectedGroupType={setSelectedGroupType} />
              {selectedGroupType === "Protected" && <PasswordField password={password}/> }
              
              <button
                type="submit"
                className="py-2 px-6 mt-12 bg-white text-blue-950 font-semibold mx-3"
              >
                Create
              </button>



            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateChannel