import { MainWrapper } from ".."
import Lottie from "lottie-react";

import loading from "../../assets/loading2.json"
import { useEffect } from "react";

// import loading from "../../assets/loading_animation.json"; // Change the file extension to .json

const LoadingPage = () => {

    return (
        <MainWrapper>
            <div className="backdrop flex h-full w-full justify-center items-center">
                <Lottie animationData={loading} className="w-[300px] h-[300px]"/>
            </div>
        </MainWrapper>
    )
}

export default LoadingPage