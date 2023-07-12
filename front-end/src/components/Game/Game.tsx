import { useEffect, useRef, useState} from 'react'
import { GameParams } from './PingPongGames/interfaces/interface.game.params'
import classicGameStart from './PingPongGames/ClassicGame/src/game'
import threeGameStart from './PingPongGames/3dGame/src/game'

import './Game.css'
import LoadingPage from './LoadingPage'
import EndGame from './EndGame'
import { GameState } from './PingPongGames/GameState'

const r = (state: number): JSX.Element => {
    if (state === GameState.gameStarted) {
      return <div></div>
    } else if (state === GameState.gameEndedWin) {
      return <EndGame isWinner = {true}/>;
    } else if (state === GameState.gameEndedLoss) {
        return <EndGame isWinner = {false}/>;
    }
    return <LoadingPage />;
};

const Game = () => {
    const isLoaded = useRef(false)
    const [state, setState] = useState(GameState.gameLoading)
    const canvasRef = useRef(null);

    const gameCallBack = (state : number) => {
        setTimeout(setState, 2000, state)
        //setState(state)
    }

    let isClassic = false
    let params : GameParams = {
        gameToken : "",
        isBotMode : false,
        canvas : canvasRef.current,
        callBack : gameCallBack
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
            {r(state)}
            <canvas ref={canvasRef} />
        </>
    )
        
}

export default Game
