import { Avatar } from "@mui/material"
import image from "../../assets/ping-pong-player.png"
import image_2 from "../../assets/ping_pong_2.jpg"
import { STATUS_SUCCESS, intra_api, google_api } from "../../Const"
import { MainWrapper } from ".."
import { useRef, useState } from "react"
import { useAppServiceContext } from "../../Context/Service/AppServiceContext"
import Cookies from 'js-cookie';

const SignIn = () => {
    const appService = useAppServiceContext()
    const [passCode, setPassCode] = useState('');
    const handlePassCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassCode(event.target.value);
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const changeUrl = useRef(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log("Make Request")
        if (id) {
            const res = await appService.requestService.postVerifyTwoFactorRequest({
                id: +id,
                passCode
            })
            if (res.status === STATUS_SUCCESS) {
                Cookies.set('access_token', res.data.accessToken);
                Cookies.set('refresh_token', res.data.refreshToken);
                window.location.href = "/";
            } else {
                //!error
            }
        }
       
    }  

    if (changeUrl.current === false) {
        //window.history.replaceState({}, '', 'SignIn');
        changeUrl.current = !changeUrl.current
    }

    if (id) {
        return (
            <MainWrapper>
                <div className="flex  bg-blue-950 h-[300px] w-[300px] justify-center items-center my-auto mx-auto">
                    <form className="flex flex-col items-center " onSubmit={handleSubmit} >
                        <input autoComplete="off" className="text-white" type="name" placeholder="passCode" aria-label="PassCode" onChange={handlePassCodeChange} ></input>
                        <button className="text-[#072964] flex items-end justify-end bg-white mt-10  py-2 px-6" type="submit">Submit</button>
                    </form>
                </div>
            </MainWrapper>
        )
    } else {
        return (
            <MainWrapper>
                <div className=" w-full flex justify-center max-custom-md:flex-col gap-12 backdrop-blur-sm items-center h-full">
                    <div className="sign-animation w-[450px] max-sm:w-[350px] rounded-[10px] h-[400px] shadow-md pb-8 relative ">
                        <Avatar src={image_2} sx={{ width: 85, height: 85 }} className='absolute mx-auto -top-[45px] saturate-50'/>
                        <div className="flex flex-col justify-center items-center h-[55%] pb-2">
                        <div className="flex justify-center items-end h-[75%]">
                            <a href={intra_api} className='text-black bg-gray-200 rounded-[5px] py-3 px-12 flex items-center'>Sign In With<span className='pl-2 text-2xl'>42</span></a>
                        </div>
                        <div className="flex justify-center items-end h-[75%]">
                            <a href={google_api} type="button" className="text-black bg-gray-200 rounded-[5px] py-3 px-12 flex items-center"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></a>
                        </div>
                        </div>
                        
                    </div>
                    <img src={image} alt="Ping_Player" className='w-[400px] max-custom-md:w-[450px] h-[400px] rounded-[10px] max-sm:w-[350px]'/>
                </div>
            </MainWrapper>
          )
    }
}

export default SignIn
