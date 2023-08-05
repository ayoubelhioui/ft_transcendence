import { Avatar } from "@mui/material"
import image from "../../assets/ping-pong-player.png"
import image_2 from "../../assets/ping_pong_2.jpg"
import { STATUS_SUCCESS, intra_api } from "../../Const"
import { MainWrapper } from ".."
import { useRef, useState } from "react"
import { useAppServiceContext } from "../../Context/Context"
import Cookies from 'js-cookie';

const SignIn = () => {
    const appService = useAppServiceContext()
    const [passCode, setPassCode] = useState('');
    const handlePassCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassCode(event.target.value);
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const IntraId = searchParams.get('IntraId');
    const username = searchParams.get('username');
    const changeUrl = useRef(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log("Make Request")
        if (id && IntraId) {
            const res = await appService.requestService.postVerifyTwoFactorRequest({
                id: +id,
                passCode,
                IntraId: +IntraId,
                username
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
                        <div className="flex justify-center items-end h-[75%]">
                            <a href={intra_api} className='text-black bg-gray-200 rounded-[5px] py-3 px-12 flex items-center'>Sign In With<span className='pl-2 text-2xl'>42</span></a>
                        </div>
                    </div>
                    <img src={image} alt="Ping_Player" className='w-[400px] max-custom-md:w-[450px] h-[400px] rounded-[10px] max-sm:w-[350px]'/>
                </div>
            </MainWrapper>
          )
    }
}

export default SignIn
