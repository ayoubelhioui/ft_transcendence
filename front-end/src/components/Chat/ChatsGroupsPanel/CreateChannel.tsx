
import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useAppServiceContext } from "../../../Context/Context";
import { STATUS_SUCCESS } from "../../../Const";
import { useChatContext } from "../ChatContext";
import { useChatsGroupsPanelContext } from "./ChatsGroupsPanelContext";



const DropList = ({selectedGroupType, setSelectedGroupType} : {selectedGroupType: any, setSelectedGroupType : any}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (name : string) => {
    setIsOpen(false)
    setSelectedGroupType(name)
  }

  const Item = ({name} : {name : string}) => {
    return (
      <li
        className="mt-2 hover:outline hover:outline-sky-700 cursor-pointer"
        onClick={() => {handleItemClick(name)}}
      >
        {name}
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
        autoComplete="off" 
        type="name"
        className="py-3 rounded-[10px] w-[90%]"
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
        autoComplete="off" 
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
  const chatContext = useChatContext()
  //const chatsGroupsPanelContext = useChatsGroupsPanelContext()
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


      const res = await appService.requestService.postCreateNewChannel(bodyData)
      if (res.status === STATUS_SUCCESS) {
        console.log("Channel Created ")
        chatContext.setUpdateChats(!chatContext.updateChats)
        //chatsGroupsPanelContext.setCommitSearch(!chatsGroupsPanelContext.commitSearch)
        setIsOpen(false)
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
        <div className="w-[400px] flex flex-col h-[400px] text-white bg-blue-950">
          <DialogTitle className="text-center text-xl">
            Create a Channel
          </DialogTitle>
          <DialogContent>
            
            <form onSubmit={handleSubmit} className="flex flex-col mt-2">
              

              <NameField name={name} />
              {/* <AvatarInput avatar={avatar} /> */}
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
