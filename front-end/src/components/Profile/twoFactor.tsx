import { useState } from "react";
import { motion } from 'framer-motion'
// import {
//   Button,
//   Dialog,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Checkbox,
// } from "@material-tailwind/react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const TwoFactor = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(event.target.value);
    setEmail(event.target.value);
    setIsValidEmail(isValidEmail);

    // Need To Set An Error If The Email Is Invalid

  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = () => {
    console.log(email);
    // handle OTP verification here
  };


  return (
    <>
      <motion.button whileTap={{scale: 0.955}} onClick={handleOpen} className="flex items-center bg-[#4D194D] py-2 px-6 mr-auto text-xs outline-none">
        Enable 2Fa
      </motion.button>

      <Dialog open={open} onClose={handleClose} className="outline-none flex h-full w-full items-center justify-center">
        <div className=" w-[25rem] h-[14rem] bg-[#072964] text-white">
          <DialogTitle className=" text-center text-lg font-extrabold">Two-Factor Authentication (2FA)</DialogTitle>
          <DialogContent>
            <div className="flex items-center border-b border-white pt-2">
                <input className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white"
                  type="email"
                  placeholder="Your Email"
                  aria-label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button className="outline-none flex-shrink-0 bg-blue-600 text-sm text-white py-1 px-2 mr-2 rounded" type="button" onClick={handleSubmit}>
                  Send
                </button>  
            </div>
          </DialogContent>
          <div className="flex items-center justify-center">
            <DialogActions className="">
              <button className="text-white" onClick={handleClose}>Cancel</button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
      
      
    </>
  );
};

export default TwoFactor;