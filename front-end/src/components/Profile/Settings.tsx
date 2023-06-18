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
    const [newAvatar, setNewAvatar] = useState<File | null>(null);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewUsername(event.target.value);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setNewAvatar(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(newAvatar);

        if (newUsername.trim() !== '' && newAvatar) {
            
            // const formData = new FormData();
            
            // formData.append('username', newUsername);
            // formData.append('avatar', newAvatar as File);
            
            setOpen(false);
            try {
                await settingContext.updateUser(newUsername, newAvatar);
            } catch(error) {
                console.log(error);
            }
        }
        else if (newUsername.trim() !== '' && !newAvatar) {
            
            setOpen(false);
            try {
                await settingContext.updateUser(newUsername, undefined);
            } catch(error) {
                console.log(error);
            }
        }
        else if (newUsername.trim() === '' && newAvatar) {
            
            setOpen(false);
            try {
                await settingContext.updateUser(undefined, newAvatar);
            } catch(error) {
                console.log(error);
            }
        }
    }  

    return (
        <>
            <motion.button type='button' whileTap={{scale: 0.955}} onClick={handleOpen} className='flex items-center bg-[#4D194D] py-2 px-6 mr-auto text-xs outline-none'> <MdEdit size={15} className='mr-1'/> Edit Profile</motion.button>

            <Dialog open={open} onClose={handleClose} className="outline-none flex h-full w-full items-center justify-center">
                <div className=" w-[27rem] h-[18rem] bg-[#0e3c80] text-white">
                    
                    <DialogTitle className=" text-center text-lg font-extrabold">Edit Your Profile</DialogTitle>
                    <DialogContent>
                        <form className="flex flex-col items-center " onSubmit={handleSubmit}>
                            {/* <input className="block w-full text-sm text-white rounded-lg cursor-pointer px-0 bg-blue-700 focus:outline-nonedark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" /> */}
                            <label htmlFor="avatar" className="outline-none bg-transparent text-gray-400 border border-white mt-4 py-2 px-3 rounded-lg w-full cursor-pointer">
                                {newAvatar ? newAvatar.name : "Choose File"}
                            </label>
                            <input type="file" accept="image/*" id="avatar" className="hidden"
                                onChange={handleImageChange}
                            />
                
                            <input className=" bg-transparent w-full leading-tight focus:outline-none py-3 text-white border border-white mt-6"
                                type="name"
                                placeholder="Username"
                                aria-label="Your Username"
                                value={newUsername}
                                onChange={handleUsernameChange}
                            />
                            <button className="text-[#072964] bg-white mt-4 py-2 px-6" type="submit">Submit</button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default Settings
