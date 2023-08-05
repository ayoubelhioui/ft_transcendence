import Lottie from "lottie-react";
import win_logo from "../../assets/animate_win.json"
import loss_logo from "../../assets/animation_loss.json"
import { useNavigate } from 'react-router-dom'


const EndGame = ({ isWinner } : { isWinner : boolean }) => {
  const navigate = useNavigate()
  //console.log("isWinn => ", isWinner)
  const image = isWinner ? win_logo : loss_logo 

  const onButtonClick = () => {
    navigate('/Playthrough')
  }
  const onReturnClick = () => {
    navigate('/Home')
  }

  return (
    <>
        <div className="bg-blue-950 absolute inset-0 flex flex-col justify-center items-center max-sm:justify-start h-screen max-sm:h-[2000px] w-full z-[2000] translate-x-0 translate-y-0">
            <Lottie animationData={image} className="w-[700px] h-[700px] max-sm:w-[400px] max-sm:h-[400px]"/>
            <div className="flex gap-12 mt-12 max-sm:mt-6 max-sm:gap-6">
              <button onClick={onButtonClick} className="inline-block bg-white text-blue-950 py-[.8rem] px-12 max-sm:px-8 rounded-[10px] text-xl max-sm:text-base"> Play Again </button>
              <button onClick={onReturnClick} className=" inline-block bg-white text-blue-950 py-[.8rem] px-12 max-sm:px-8 rounded-[10px] text-xl max-sm:text-base"> Return </button>

            </div>
        </div>
    </>
  )
    
}

export default EndGame
