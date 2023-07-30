import { MainWrapper } from ".."
import Lottie from "lottie-react";

import loading from "../../assets/loading2.json"


const LoadingPage = () => {

    return (
    
            <div className="backdrop flex h-screen w-full justify-center items-center">
                <Lottie animationData={loading} className="w-[300px] h-[300px]"/>
            </div>
   
    )
}

export default LoadingPage
