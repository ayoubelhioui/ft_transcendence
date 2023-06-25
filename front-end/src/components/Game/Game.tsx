import { useEffect, useRef} from 'react'
import { GameParams } from './PingPongGames/interfaces/interface.game.params'
//import startGame from './PingPongGames/ClassicGame/src/game'
import startGame from './PingPongGames/3dGame/src/game'




const Game = () => {
    const isLoaded = useRef(false)

    let params : GameParams = {
        gameToken : "",
        isBotMode : false,
        isClassic : true
    }

    useEffect(() => {
    if (!isLoaded.current) {
        startGame(params)
        isLoaded.current = true;
    }
    }, [])

    return (
    <>
        <div className="grid grid-cols-column-layout grid-rows-2 gap-4 justify-center items-center my-auto mx-auto w-[1500px] max-sm:w-full">
        
        </div>
    </>
    )
}

export default Game
