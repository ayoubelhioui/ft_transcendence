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


const TwoFactor = () => {
    const appService = useAppServiceContext()
    const [open, setOpen] = useState(false);
    const [factor, setFactor] = useState(appService.authService.user?.two_factors_enabled);
    const title = factor ? "Disable two factor" : "Enable two factor"

    const [url, setUrl] = useState('');
    const secretCode = useRef('')
    const passCode = useRef('')
    function handlePassCodeChange(event: React.ChangeEvent<HTMLInputElement>){
        passCode.current = event.target.value
    }
    
    const getSecretCode = async () => {
        const res = await appService.requestService.getSecretKeyRequest()
        if (res.status === STATUS_SUCCESS) {
            const secret: string = res.data
            const username = appService.authService.user?.username
            const otpAuthUrl: string = otplib.authenticator.keyuri(username!, 'transcendence', secret);
            secretCode.current = secret
            setUrl(otpAuthUrl)
            setOpen(true)
        } else {
            //!popup
        }
    }

    const enableTwoFactor = async () => {
        const res = await appService.requestService.postVerifyEnableTwoFactorRequest({
            passCode : passCode.current,
            secretCode : secretCode.current
        })
        if (res.status === STATUS_SUCCESS) {
            setFactor(true)
            setOpen(false)
        } else {
            //!popup
        }
    }

    const disableTwoFactor = async () => {
        const res = await appService.requestService.postDisableTwoFactorsRequest()
        if (res.status === STATUS_SUCCESS) {
            setFactor(false)
        } else {
            //!popup
        }
    }

    const handleButtonClick = async () => {
        if (factor) {
            await disableTwoFactor()
        } else {
            await getSecretCode()
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await enableTwoFactor()
    }
    
    return (
        <>


            <motion.button 
            type='button'
            whileTap={{scale: 0.955}}
            onClick={handleButtonClick}
            className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
            > 
                <MdEdit size={15} className='mr-1'/> 
                {title}
            </motion.button>
            
            <Dialog open={open} onClose={() => setOpen(false)} className="outline-none bg-blue-950 flex h-full w-full items-center justify-center">
                <div className=" w-[25rem] h-[23rem] bg-[#0e3c80] text-white max-sm:w-[25rem] ">
                    
                    <DialogTitle className=" text-center text-lg font-extrabold">Enable 2FA Authentication</DialogTitle>
                    <DialogContent >
                        <form className="flex flex-col items-center mt-2" onSubmit={handleSubmit} >
                            <QRCode  value={url} />
                            <input autoComplete="off"  name="passCode" type="text" placeholder="Enter The Code" aria-label="PassCode" onChange={handlePassCodeChange} className="w-[250px]"></input>
                            <button className="text-[#072964] flex items-end justify-end bg-white mt-5 py-2 px-8" type="submit">Submit</button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
          
        </>
    )
}

export default TwoFactor
