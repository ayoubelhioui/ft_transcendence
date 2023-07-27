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
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_SUCCESS } from "../../Const";


const TwoFactor = ({secret, setPassCode} : {secret : string, setPassCode : any}) => {
   



}


const EnableTwoFactor = () => {
    const [secret, setSecret] = useState('');
    const [passCode, setPassCode] = useState('');
    const secretCode = useRef('')
    const handlePassCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassCode(event.target.value);
    const appService = useAppServiceContext()
    
    useEffect(() => {
        const sendRequest = async () => {
            const res = await appService.requestService.postGetSecretKeyRequest()
            console.log(res)
            if (res.status === STATUS_SUCCESS) {
                const secret: string = res.data
                const username = appService.authService.user?.username
                const otpAuthUrl: string = otplib.authenticator.keyuri(username!, 'transcendence', secret);
                secretCode.current = secret
                setSecret(otpAuthUrl)
            }
        }
        sendRequest()
    }, [])

    return (
        <>
            <QRCode  value={secret} />
            <input className="text-black" type="name" placeholder="passCode" aria-label="PassCode" onChange={handlePassCodeChange} ></input>
        </>
    )
}


const Settings = () => {
    const appService = useAppServiceContext()
    const settingContext = appService.authService;
    
    
    const inputRef = useState(null)
    


    const [open, setOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    const [factor, setFactor] = useState(appService.authService.user?.two_factors_enabled);



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewUsername(event.target.value);

    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await appService.requestService.postVerifyEnableTwoFactorRequest({
            passCode : passCode,
            secretCode : secretCode.current
        })
        console.log(passCode, secretCode.current, res)
        if (res.status === STATUS_SUCCESS) {
            setSecret('')
            setFactor(true)
        }






        /*if (newUsername.trim() !== '') {

            setOpen(false);
            try {
                //!await settingContext.updateUser(newUsername, factor);
                
            } catch(error) {
                console.log("here is submit");
                console.log(error);
            }
        }
        else if (newUsername.trim() === '')
        {
            setOpen(false);
            try {
                //!await settingContext.updateUser(undefined, factor);
                
            } catch(error) {
                console.log(error);
            }
        }*/
    }  


    const enableTwoFactorsClick = async () => {
        const res = await appService.requestService.postGetSecretKeyRequest()
        console.log(res)
        if (res.status === STATUS_SUCCESS) {
            const secret: string = res.data
            const username = appService.authService.user?.username
            const otpAuthUrl: string = otplib.authenticator.keyuri(username!, 'transcendence', secret);
            secretCode.current = secret
            setSecret(otpAuthUrl)
        }
    }

    const disableTwoFactorClick = async () => {
        const res = await appService.requestService.postDisableTwoFactorsRequest()
        console.log(res)
        if (res.status === STATUS_SUCCESS) {
            setFactor(false)
        }
    }

    return (
        <>
            <motion.button type='button' whileTap={{scale: 0.955}} onClick={handleOpen} className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'> <MdEdit size={15} className='mr-1'/> Edit Username</motion.button>

            <Dialog open={open} onClose={handleClose} className="outline-none flex h-full w-full items-center justify-center">
                <div className=" w-[27rem] h-[18rem] bg-[#0e3c80] text-white max-sm:w-[25rem]">
                    
                    <DialogTitle className=" text-center text-lg font-extrabold">Edit Your Profile</DialogTitle>
                    <DialogContent >
                        <form className="flex flex-col items-center " onSubmit={handleSubmit} >
                            
                            <input className=" bg-transparent w-full leading-tight focus:outline-none py-3 text-white border border-white mt-6"
                                type="name"
                                placeholder="Username"
                                aria-label="Your Username"
                                value={newUsername}
                                onChange={handleUsernameChange}
                            />
                            { factor ?

                                (<motion.button type='button' whileTap={{scale: 0.955}} onClick={disableTwoFactorClick} className='flex items-center border border-white border-solid py-2 px-6 mr-auto text-xs outline-none'>Disable 2Fa</motion.button>) :

                                (<motion.button type='button' whileTap={{scale: 0.955}} onClick={enableTwoFactorsClick} className='flex items-center border border-white border-solid py-2 px-6 mr-auto text-xs outline-none '>Enable 2Fa</motion.button>)
                            }
                            { secret !== "" && <TwoFactor secret={secret} setPassCode={setPassCode} />  }
                            <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit">Submit</button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default Settings
