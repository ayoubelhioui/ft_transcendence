import { useEffect, useRef, useState} from 'react'
import { GameParams } from './PingPongGames/interfaces/interface.game.params'
import { GameState } from './PingPongGames/GameState'
import { useAppServiceContext } from '../../Context/Context';
import { Game as ThreeGame } from './PingPongGames/3dGame/src/MyObjects/Game'
import { Game as ClassicGame } from './PingPongGames/ClassicGame/src/MyObjects/Game'

function createGame(params : GameParams, gameCallBack : any) {
    params.callBack = gameCallBack
    if (params.isClassic) {
        return new ClassicGame(params)
    }
    else
        return new ThreeGame(params, params.resources)
}


function createCanvas(containerElement : HTMLDivElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas
}

const Game =  () => {
    const appService = useAppServiceContext()
    const accessToken = appService.authService.getAccessToken
    const gameParams = appService.utilService.gameParams
    const [state, setState] = useState(GameState.gameLoading)
    const rootHtmlElement = useRef<HTMLDivElement>(null);

    if (!gameParams) {
        throw new Error("Game params not defined")
    }
    
    useEffect(() => {
        let canvas : HTMLCanvasElement | null = null
        let gameObject = null

        if (rootHtmlElement.current) {
            canvas = createCanvas(rootHtmlElement.current)
            gameObject = createGame(gameParams, (state : number) => {
                setTimeout(setState, 500, state)
            })
        }
   
        return () => {
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            //!destroy the game object            
        };

    }, [])

    return (
        <>
            <div  ref={rootHtmlElement} />
        </>
    )
        
}

export default Game
