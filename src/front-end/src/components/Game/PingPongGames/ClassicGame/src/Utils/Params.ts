import { Vector3 } from "three"

export const params = {

    winWidth : window.innerWidth,
    winHeight : window.innerHeight,
    aspect : window.innerWidth /  window.innerHeight,

    //camera
    cameraPos : new Vector3(0, 0, 17),
    cameraRotation : new Vector3(0, 0, 0),

    //event
    event: {
        x : 0
    },
    timeStep : 1 / 60,
    ballDim: 0.1,
    frame: 0,
    paddleDim: {
        x: 0.15,
        y: 1.3
    },
    // 8 / 5
    sceneDim: {
        x: 20,
        y: 12.5
    }
}
