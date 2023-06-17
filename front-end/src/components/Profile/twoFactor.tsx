import { useState } from "react";
import { motion } from 'framer-motion'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

const TwoFactor = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleOpen = () => setOpen((cur) => !cur);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle OTP verification here
  };

  return (
    <>
      <motion.button whileTap={{scale: 0.955}} onClick={handleOpen} className="flex items-center bg-[#4D194D] py-2 px-6 mr-auto text-xs outline-none">
        Enable 2Fa
      </motion.button>
      
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none outline-none"
      >
        <Card className="mx-auto w-full max-w-[25rem] bg-[#193a6894] backdrop-blur-md rounded-md h-[15rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className=" text-center text-lg font-extrabold"
          >
            <h3 className="mt-4">Two-Factor Authentication (2FA)</h3>   
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Code"
                  value={code}
                  onChange={handleCodeChange}
                  required
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                color="blue"
                size="lg"
              >
                Verify
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
};

export default TwoFactor;