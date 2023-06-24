// import { motion } from 'framer-motion'

// import { authContext } from './context/useContext';
import { useState } from 'react';


const twoFactor = () => {
  // const authFactor = authContext();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [nextStep, setNextStep] = useState(false);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value);

  const handleSubmit = () => null;


  
  return (
    <div className=" w-full flex justify-center items-center p-4 bg-profile-bg bg-cover bg-center backdrop-blur-md h-screen">
      <div className="sign-animation w-[550px] rounded-[10px] border-neutral-950 h-[350px] flex justify-center items-end shadow-md backdrop-blur-xl bg-transparent pb-8">

        {!nextStep ? (

            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full h-full'>
              <input className=" bg-transparent w-full leading-tight focus:outline-none py-3 text-white border border-white mt-6"
                type="email"
                placeholder="Your Email"
                aria-label="email"
                value={email}
                onChange={handleEmail}
              />
              <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit" onClick={ () => setNextStep(true) } >Send</button>
            </form>

        ) : (
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full h-full'>
              <input className=" bg-transparent w-full leading-tight focus:outline-none py-3 text-white border border-white mt-6"
                type="password"
                placeholder="Your Code"
                aria-label="password"
                value={code}
                onChange={handleCode}
              />
              <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit" onClick={ () => setNextStep(false) } >Submit</button>
            </form>
        )}

      </div>
    </div>
  )
}

export default twoFactor