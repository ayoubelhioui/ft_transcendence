import React, { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion'
import { MdEdit } from 'react-icons/md'
import QRCode from 'qrcode.react';
import * as otplib from 'otplib';

// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";
import { STATUS_SUCCESS } from "../../Const";

const EditUserName = ({setUserName} : {setUserName : any}) => {
    const appService = useAppServiceContext()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const newUsername = useRef('')
    function handleNewUsernameChange(event: React.ChangeEvent<HTMLInputElement>){
        newUsername.current = event.target.value
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newUsername.current.trim() !== '') {
            const res = await appService.requestService.putUpdateUserNameRequest({
                username : newUsername.current
            })
            if (res.status === STATUS_SUCCESS) {
                appService.authService.user!.username = newUsername.current
                setUserName(newUsername.current)
                newUsername.current = ""
                setOpen(false);
            }
            else {
                //!popup
            }
        }
        else
        {
            //!popup
        }
    }  

    return (
        <>
            <motion.button 
            type='button'
            whileTap={{scale: 0.955}}
            onClick={handleOpen}
            className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
            > 
                <MdEdit size={15} className='mr-1'/> 
                Edit Username
            </motion.button>


            <Dialog open={open} onClose={() => setOpen(false)} className="outline-none flex h-full w-full items-center justify-center">
                <div className=" w-[25rem] h-[15rem] bg-[#0e3c80] text-white max-sm:w-[25rem] ">
                    
                <DialogTitle className=" text-center text-lg font-extrabold">Change Your Username</DialogTitle>
                    <DialogContent >
                        <form className="flex flex-col items-center " onSubmit={handleSubmit} >
                        <input autoComplete="off" name="username" type="text" placeholder="Enter Your Username" aria-label="UserName" onChange={handleNewUsernameChange} className="w-[270px] h-[40px]" ></input>
                            <button className="text-[#072964] flex items-end justify-end bg-white mt-6  py-2 px-8" type="submit">Submit</button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>


        </>
    )

}

export default EditUserName
