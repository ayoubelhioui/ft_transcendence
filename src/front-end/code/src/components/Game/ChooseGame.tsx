import { useState } from 'react';
import image from '../../assets/image.png'
import image_2 from '../../assets/image_2.png'
import img_classic_game from '../../assets/classic-game.png'
import img_three_game from '../../assets/table3d.png'
import { useAppServiceContext } from '../../Context/Service/AppServiceContext';
import { useNavigate } from 'react-router-dom';

const GAME_2D = true
const GAME_3D = false

const ChooseGame = () => {
  const appService = useAppServiceContext()
  const navigate = useNavigate()
  const [isBotGame, setIsBotGame] = useState<boolean | undefined>(undefined);

  const goToGame = (isClassicGame : boolean) => {  
    appService.utilService.gameParams = {
      isBotMode : isBotGame!,
      isClassic : isClassicGame
    }
    navigate("/Play")
  }

  return (
    <div className="purple_back flex flex-col gap-16 max-sm:gap-8 items-center mx-24 max-sm:mx-0 max-sm:h-full h-[650px] max-sm:w-full my-auto p-8 text-white">
        {isBotGame === undefined ?
          <>
            <h1 className='text-5xl max-sm:text-3xl'>Choose Which To Play Against</h1>
            <div className="flex justify-around max-sm:flex-col max-sm:gap-4 w-full">
              <div className="flex flex-col gap-4 items-center hover:scale-105 transition-all duration-500 cursor-pointer" onClick={() => setIsBotGame(true)}>
                  <img src={image} alt="bot_image" className='w-[350px]'/>
                  <h1 className='text-4xl uppercase text-center max-sm:text-2xl'>PLay With A Bot</h1>
              </div>
              <div className="flex flex-col gap-4 items-center hover:scale-105 transition-all duration-500 cursor-pointer" onClick={() => setIsBotGame(false)}>
                  <img src={image_2} alt="friend_image" className='w-[350px]'/>
                  <h1 className='text-4xl uppercase text-center max-sm:text-2xl'>PLay With A Friend</h1>
              </div>
            </div>
          </> :
          <>
            <h1 className='text-5xl max-sm:text-3xl'>Choose Your Game Type</h1>
            <div className="flex justify-around max-sm:flex-col max-sm:gap-4 w-full">
              <div className="flex flex-col gap-4 items-center hover:scale-105 transition-all duration-500 cursor-pointer" onClick={() => goToGame(GAME_2D)}>
                  <img src={img_classic_game} alt="bot_image" className='w-[450px]'/>
                  <h1 className='text-4xl uppercase text-center max-sm:text-2xl'>2D Game</h1>
              </div>
              <div className="flex flex-col gap-4 items-center hover:scale-105 transition-all duration-500 cursor-pointer"onClick={() => goToGame(GAME_3D)}>
                  <img src={img_three_game} alt="friend_image" className='w-[450px]'/>
                  <h1 className='text-4xl uppercase text-center max-sm:text-2xl'>3D Game</h1>
              </div>
            </div>
          </>
        }
        
    </div>
  )
}

// When i will click on the last image type i will have to get the id of the game from the endpoint

export default ChooseGame
