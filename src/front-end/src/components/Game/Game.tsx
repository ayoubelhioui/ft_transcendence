import { useEffect, useRef, useState} from 'react'
import { GameParams, GameParamsCollect } from './PingPongGames/interfaces/interface.game.params'
import { GameState } from './PingPongGames/GameState'
import { useAppServiceContext } from '../../Context/Context';
import { Game as ThreeGame } from './PingPongGames/3dGame/src/MyObjects/Game'
import { Game as ClassicGame } from './PingPongGames/ClassicGame/src/MyObjects/Game'
import EndGame from './EndGame';
import LoadingPage from './LoadingPage';

const GameUi = ({state} : {state : number}) => {
    if (state === GameState.gameStarted) {
      return <div></div>
    } else if (state === GameState.gameEndedWin) {
      return <EndGame isWinner = {true}/>;
    } else if (state === GameState.gameEndedLoss) {
        return <EndGame isWinner = {false}/>;
    }
    return <LoadingPage />;
};

function createGame(params : GameParamsCollect) {
    const gameParams = params as GameParams
    if (params.isClassic) {
        return new ClassicGame(gameParams)
    }
    else
        return new ThreeGame(gameParams)
}

function createCanvas(containerElement : HTMLDivElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas
}

function validateGameParams(params : GameParamsCollect) {
    if (
        !params.authToken ||
        !params.callBack ||
        !params.canvas ||
        params.isBotMode === undefined ||
        params.resources === undefined ||
        !params.userId ||
        !params.socket
        )
        return (false)
    return (true)
}

const Game =  () => {
    const appService = useAppServiceContext()
    const gameParams = appService.utilService.gameParams
    const [state, setState] = useState(GameState.gameLoading)
    const rootHtmlElement = useRef<HTMLDivElement>(null);
    const [errorInGame, setErrorInGame] = useState(0)

    useEffect(() => {
        let canvas : HTMLCanvasElement | null = null
        let gameObject : ThreeGame | ClassicGame | null = null

        if (rootHtmlElement.current && gameParams) {
            canvas = createCanvas(rootHtmlElement.current)
            gameParams.resources = appService.utilService.gameResources
            gameParams.userId = appService.authService.user?.id
            gameParams.authToken = appService.authService.getAccessToken
            gameParams.canvas = canvas
            gameParams.socket = appService.socketService.getSocket()
            gameParams.callBack = (state : number) => {
                if (state === GameState.gameException) {
                    //console.log("Exception??", errorInGame, "state", state)
                    gameObject?.stop()
                    // if (errorInGame < 3) {
                    //     //console.log("Refresh Game....")
                    //     setTimeout(setErrorInGame, 1000, errorInGame + 1)
                    // }
                }
                setTimeout(setState, 500, state)
            }
            if (validateGameParams(gameParams)) {
                //console.log("creating game with gameParams = ", gameParams)
                gameObject = createGame(gameParams)
                gameObject.loop()
            } else {
                //console.log("Error game Params: ", gameParams)
            }
        }
        if (!gameObject) {
            //console.log("Error in game")
        }
   
        return () => {
            //console.log("leave")
            if (gameObject) {
                gameObject.stop()
                gameObject.socketMgr.socket.emit("leaveGame", {})
            }
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }          
        };

    }, [errorInGame])

    return (
        <>
            <GameUi state={state}></GameUi>
            <div ref={rootHtmlElement} className='absolute h-screen w-screen z-[1000] inset-0 m-auto translate-x-0 translate-y-0 max-sm:h-full' />
        </>
    )
        
}

export default Game
