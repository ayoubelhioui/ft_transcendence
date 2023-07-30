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



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await appService.requestService.getUsersSearchRequest(search.current);

    if (result.status === STATUS_UNDEFINED) {
        //!loading
        setList([])
    } else if (result.status === STATUS_SUCCESS) {
        setList(result.data)
    } else if (result.status === STATUS_ERROR) {
        setList([])
        //!popup
    }

    console.log("Search ... ", search.current)
  }



  return (
    <div className="flex flex-col top_1 w-[300px] text-gray-400 max-m-custom-md:w-[100%] max-sm:h-[280px] h-[550px] my-auto max-m-custom-md:h-[200px]">
      <div className="flex justify-around items-center">
        <h1 className="text-2xl">Friends List</h1>
        <button type='button' className='outline-none' onClick={undefined}>
          <PlusCircle size={30} className='text-white'/>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex relative justify-between items-center h-full">
            
            <form onSubmit={handleSubmit} className="flex flex-col mt-4">
              <input
                type="text"
                className="shadow border-0 my-4 mx-2 w-[280px] h-[40px] rounded-[10px]"
                placeholder="Search"
                name="search"
                onChange={handleInputChange}
              />
            </form>
            
            {/* <BiSearchAlt2 size={20} className="h-full"/> */}
          
          </div>
        </div>

        {list.length ?
          <List list={list}/>
          :
          <NoContent/>
        }

      </div>
    </div>
  export default AddFriend;