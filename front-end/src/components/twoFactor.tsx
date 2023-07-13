
// import { authContext } from './context/useContext';
import axiosInstance from './api/axios';
import { useEffect, useState } from 'react';


const twoFactor = () => {
  // const authFactor = authContext();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [nextStep, setNextStep] = useState(false);

  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const username = searchParams.get('username');
    setId(id);
    setUsername(username);
  }, []);

  console.log(id + "  " + username);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCode(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const emailObj = {
      userEmail: email,
    }

    try {
      const response = await axiosInstance.post("/auth/two-factors", emailObj);
      
      setNextStep(true);

    } catch (error) {
      console.log("here in catch");
    }
  };

  const handleSubmitCode = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    // console.log("here in submit  " + email);

    const codeObj = {
      userEmail: email,
      token: code,
      IntraId: id,
      username: username
    }

    try {
      const response = await axiosInstance.post("/auth/verify-two-factors", codeObj);

      
      console.log();
    } catch (error) {
      console.log("here in catch");
    }
  };

  return (
    <div className=" w-full flex justify-center items-center p-4 bg-profile-bg bg-cover bg-center backdrop-blur-md h-screen">
      <div className="sign-animation w-[550px] rounded-[10px] border-neutral-950 h-[350px] flex justify-center items-end shadow-md backdrop-blur-xl bg-transparent pb-8">

        {nextStep ? (
          <form onSubmit={handleSubmitCode} className='flex flex-col justify-center items-center w-full h-full'>
            <input className=" bg-transparent w-[80%] mx-auto leading-tight focus:outline-none py-3 text-white border border-white mt-6"
              type="password"
              placeholder="Your Code"
              aria-label="password"
              value={code}
              onChange={handleCode}
            />
            <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit" >Submit</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full h-full'>
            <h2 className='text-white text-2xl mb-3'>Authenticate By Sending Your Email</h2>
            <input className=" bg-transparent w-[80%] mx-auto leading-tight focus:outline-none py-3 text-white border border-white mt-6"
              type="email"
              placeholder="Your Email"
              aria-label="email"
              value={email}
              onChange={handleEmail}
            />
            <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit">Send</button>
          </form>
        )}

      </div>
    </div>
  )
}

export default twoFactor