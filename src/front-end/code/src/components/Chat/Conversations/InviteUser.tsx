import { ReactNode, useEffect, useRef} from "react";
import { AiOutlinePlusCircle as PlusCircle } from 'react-icons/ai'
import {MdManageSearch} from 'react-icons/md'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../../Const";
import { useAppServiceContext } from "../../../Context/Service/AppServiceContext";
import { useChatsGroupsPanelContext } from "../ChatsGroupsPanel/ChatsGroupsPanelContext";
import { useChatContext } from "../ChatContext";
import { openPopupError } from "../../HomePage/Popup/Popup";
import { Avatar } from "@mui/material";


const Wrapper = ( {children} : {children : ReactNode} ) =>  {
  return (
      <div className="flex flex-col gap-4 justify-between items-center w-full ml-4 overflow-y-scroll">
          {children}
      </div>
      
  )
}

const Item = ({payload, closeDialog} : {payload : any, closeDialog : any}) => {
  const appService = useAppServiceContext()
  const chatContext = useChatContext()
  const navigate = useNavigate();
  const user = payload

  const avatar = `http://${address}/users/image/${user.id}`


  const itemOnClick = async () => {
    const channelId = chatContext.conversationInfo.id
    const res = await appService.requestService.postInviteToChannel(channelId!, user.id)
    //console.log("Invite user: ", res)
    if (res.status) {
      closeDialog()
    }
  }

  return (
    <div onClick={itemOnClick} className="flex mt-3 items-center justify-between text-white w-full cursor-pointer">
      <div className="flex items-center gap-6 w-full">
        <Avatar src={avatar} className="w-[50px] h-[50px] rounded-[50%] object-cover" alt={user.username} />
        <div className="w-1/2">{user.username}</div>
      </div>
    </div>
  )
}

const NoContent = () => {
  return (
      <Wrapper>
          {/* <div className="flex h-full mx-auto my-auto w-full justify-center items-center text-xl "> Not Found </div> */}
      </Wrapper>
  )
}


const List = ({list, closeDialog} : {list : any, closeDialog : any}) => {
  return (
      <Wrapper>
          {
              list.map((item : any, index : number) => (            
                  <Item key={item.id} payload={item} closeDialog={closeDialog}/>
              ))
          }
      </Wrapper>
  )
}


const InviteUser = ({openState} : {openState : any}) => {
  const appService = useAppServiceContext()
  const [open, setOpen] = openState
  const [list, setList] = useState<any[]>([])
  const search = useRef("");

  const closeDialog = () => {
    setList([])
    search.current = ""
    setOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await appService.requestService.getUsersSearchRequest(search.current);

    if (result.status === STATUS_UNDEFINED) {
        setList([])
    } else if (result.status === STATUS_SUCCESS) {
        setList(result.data)
    } else if (result.status === STATUS_ERROR) {
        setList([])
        openPopupError("An error occurred")
    }

  }


  return (
    
    <>
      <Dialog
        open={open}
        onClose={closeDialog}
        className="flex h-full w-full items-center justify-center"
      >
        <div className="w-[300px] flex flex-col justify-center items-center overflow-hidden h-[370px] text-white bg-blue-950">
          <DialogTitle className="text-center text-xl">
            Search For Users
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-col justify-between items-center">
              <form onSubmit={handleSubmit}>
                  <input
                  autoComplete="off" 
                  type="text"
                  className="shadow border-0 my-4 mx-2 w-[250px] h-[40px] rounded-[10px]"
                  placeholder="Search and click enter ..."
                  name="search"
                  onChange={(e) => {search.current = e.target.value;}}
                  />
              </form>
              
            </div>
            {list.length ?
              <List list={list} closeDialog={closeDialog} />
              :
              <NoContent/>
            }
          </DialogContent>
        </div>

      </Dialog>
    </>
  );
};

 export default InviteUser;