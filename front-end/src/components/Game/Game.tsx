import { useEffect, useRef} from 'react'
import { GameParams } from './PingPongGames/interfaces/interface.game.params'
import classicGameStart from './PingPongGames/ClassicGame/src/game'
import threeGameStart from './PingPongGames/3dGame/src/game'




const Game = () => {
    const isLoaded = useRef(false)
    const canvasRef = useRef(null);


    let isClassic = true
    let params : GameParams = {
        gameToken : "",
        isBotMode : true,
        canvas : canvasRef.current
    }


    useEffect(() => {
    if (!isLoaded.current) {
        params.canvas = canvasRef.current
        if (isClassic)
            classicGameStart(params)
        else
            threeGameStart(params)
        isLoaded.current = true;
    }
    }, [])

    return (
    <> 
        <canvas ref={canvasRef} />
    </>
    )
}

export default Game
