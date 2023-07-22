import { useEffect, useRef, useState} from 'react'
import axios from "axios";

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


async function loadData(params : GameParams) {
    try {
        const host = import.meta.env.VITE_HOST || 'localhost'
        const port = import.meta.env.VITE_SERVER_PORT || '80'
        const socketAddr = `http://${host}:${port}`
        const userId = params.userId
        const availableUsers = await axios.get(`${socketAddr}/users`)
        availableUsers.data = availableUsers.data.filter((item : any) => item.username !== "bot")
        const usersIds = availableUsers.data.map((item : any) => item.id)
        console.log(usersIds)
        const response = await axios.post(`${socketAddr}/auth/${userId}`)
        const authToken = response.data.access_token
        console.log(`using user ${userId} token => `, authToken)
        return (authToken)

    } catch (error) {
        console.log(`Can't get users => ${error}`)
    }
    return ""
}

async function runGame(params : GameParams) {
        params.authToken = await loadData(params)
      
        if (params.isClassic) {
            classicGameStart(params)
        }
        else
            threeGameStart(params)
}

function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);

    // Get individual parameters by their names
    const testType = searchParams.get('watch');
    console.log(testType)


    //console.log("urls params : ?userId=1&isBotMode=false&isClassic=true&isWatchMode=false&gameToken=1&userToInvite=2")
    console.log("urls params : ?userId=1&isWatchMode=false&gameToken=1&userToInvite=2")
    return {
        isWatchMode : searchParams.get('isWatchMode') === 'true',
        gameToken : searchParams.get('gameToken') as string,
        userId : searchParams.get('userId') as string,
        userToInvite : searchParams.get('userToInvite') as string,
        // isBotMode : searchParams.get('isBotMode') === 'true',
        // isClassic : searchParams.get('isClassic') === 'true',
        isBotMode : true,
        isClassic : false,
    }
}

const Game =  () => {
    
    let urlParams = getUrlParams()
    console.log(urlParams)
    const isLoaded = useRef(false)
    const [state, setState] = useState(GameState.gameLoading)
    const canvasRef = useRef(null);

    const gameCallBack = (state : number) => {
        setTimeout(setState, 500, state)
        //setState(state)
    }

    let params : GameParams = {
        isWatchMode : urlParams.isWatchMode,
        gameToken : +urlParams.gameToken,
        userToInvite : +urlParams.userToInvite,
        userId : +urlParams.userId,
        isClassic : urlParams.isClassic,
        isBotMode : urlParams.isBotMode,
        canvas : canvasRef.current,
        authToken : "",
        callBack : gameCallBack
    }


    useEffect(() => {
        if (!isLoaded.current) {
            params.canvas = canvasRef.current
            runGame(params)
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
