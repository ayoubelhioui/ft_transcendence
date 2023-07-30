import { useEffect, useRef, useState} from 'react'
import axios from "axios";

import Cookies from 'js-cookie';

import { GameParams } from './PingPongGames/interfaces/interface.game.params'

import classicGameStart from './PingPongGames/ClassicGame/src/game'
import threeGameStart from './PingPongGames/3dGame/src/game'

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
        const access_Token = Cookies.get('access_token');
        console.log(`using user token => `, access_Token)
        return (access_Token!)

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
        isClassic : true,
    }
}

const Game =  () => {
    
    let urlParams = getUrlParams()
    console.log(urlParams)
    const isLoaded = useRef(false)
    const [state, setState] = useState(GameState.gameLoading)
    let threeRootElement : any = undefined;
    // const canvasRef = useRef(null);

    const gameCallBack = (state : number) => {
        setTimeout(setState, 500, state)
        //setState(state)
    }

   


    useEffect(() => {
        const canvasId = "gameCanvasId"
        if (!isLoaded.current) {

            function createCanvas(containerElement : any) {
                let canvas = document.getElementById(canvasId)
                if (canvas) {
                    canvas.style.display = 'absolute'
                    return canvas
                } else {
                    canvas = document.createElement('canvas');
                    canvas.id = canvasId
                    containerElement.appendChild(canvas);
                    return canvas;
                }
            }


            let params : GameParams = {
                isWatchMode : urlParams.isWatchMode,
                gameToken : urlParams.gameToken,
                userToInvite : urlParams.userToInvite ? +urlParams.userToInvite : null,
                userId : +urlParams.userId,
                isClassic : urlParams.isClassic,
                isBotMode : urlParams.isBotMode,
                canvas : createCanvas(threeRootElement),
                authToken : "",
                callBack : gameCallBack
            }
            console.log(params)
            runGame(params)
            isLoaded.current = true;
        }
        return () => {
            const canvas = document.getElementById(canvasId)
            if (canvas)
                canvas.style.display = 'none'
            console.log('Component is about to be destroyed. End Game');
          };
    }, [])

    return (
        <>
            {r(state)}
            {/* <canvas ref={element => threeRootElement = element} /> */}
            <div  ref={element => threeRootElement = element} />
        </>
    )
        
}

export default Game
