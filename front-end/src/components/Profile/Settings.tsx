import { useState } from "react";
import { motion } from 'framer-motion'
import { MdEdit } from 'react-icons/md'
import axios from "axios";


// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { authContext } from "../context/useContext";


const Settings = () => {
    const settingContext = authContext();


    const [open, setOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [factor, setFactor] = useState(false);



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewUsername(event.target.value);
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (newUsername.trim() !== '') {
            
            setOpen(false);
            try {
                await settingContext.updateUser(newUsername, factor);

            } catch(error) {
                console.log(error);
            }
        }
        else if (newUsername.trim() === '')
        {
            setOpen(false);
            try {
                await settingContext.updateUser(undefined, factor);
                
            } catch(error) {
                console.log(error);
            }
        }
    }  

    return (
        <>
            <motion.button type='button' whileTap={{scale: 0.955}} onClick={handleOpen} className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'> <MdEdit size={15} className='mr-1'/> Edit Profile</motion.button>

            <Dialog open={open} onClose={handleClose} className="outline-none flex h-full w-full items-center justify-center">
                <div className=" w-[27rem] h-[18rem] bg-[#0e3c80] text-white">
                    
                    <DialogTitle className=" text-center text-lg font-extrabold">Edit Your Profile</DialogTitle>
                    <DialogContent>
                        <form className="flex flex-col items-center " onSubmit={handleSubmit} >
                            {/* <input className="block w-full text-sm text-white rounded-lg cursor-pointer px-0 bg-blue-700 focus:outline-nonedark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" /> */}
                            
                            <input className=" bg-transparent w-full leading-tight focus:outline-none py-3 text-white border border-white mt-6"
                                type="name"
                                placeholder="Username"
                                aria-label="Your Username"
                                value={newUsername}
                                onChange={handleUsernameChange}
                            />
                            { factor ?

                                (<motion.button type='button' whileTap={{scale: 0.955}} onClick={() => setFactor(false)} className='flex items-center border border-white border-solid py-2 px-6 mr-auto text-xs outline-none'>Disable 2Fa</motion.button>) :

                                (<motion.button type='button' whileTap={{scale: 0.955}} onClick={() => setFactor(true)} className='flex items-center border border-white border-solid py-2 px-6 mr-auto text-xs outline-none '>Enable 2Fa</motion.button>)
                            }
                            <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit">Submit</button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default Settings
