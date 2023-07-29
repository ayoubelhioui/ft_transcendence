import { ReactNode, useRef} from "react";
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import { useState } from "react";

import { Avatar } from "@mui/material";




const AddFriend = () => {

    const search = useRef("");
    const [isCreated, setIsCreated] = useState(true);
    const HandleClose = () => setIsCreated(false);



    return (
      
      <>
        <Dialog
          open={isCreated}
          onClose={HandleClose}
          className="flex h-full w-full items-center justify-center"
        >
          <div className="w-[300px] flex flex-col justify-center items-center overflow-hidden h-[370px] text-white bg-blue-950">
            <DialogTitle className="text-center text-xl">
              Invite Friends
            </DialogTitle>
            <DialogContent>
              <div className="flex flex-col justify-between items-center">
                <form onSubmit={onSubmit}>
                    <input
                    type="text"
                    className="shadow border-0 my-4 mx-2 w-[250px] h-[40px] rounded-[10px]"
                    placeholder="Search"
                    name="search"
                    onChange={(e) => {search.current = e.target.value;}}
                    />
                </form>
                
              </div>
            </DialogContent>
          </div>
  
        </Dialog>
      </>
    );
  };

  export default AddFriend;