import { Vector2, Vector3 } from "three"
import { PlanePoints } from "../interfaces/interface.plane.points"
import { PlayerInfo } from "../interfaces/interface.player.info"

export const params = {
//Used with gui
    enableOrbit : true,
    color: 0x2f1528,


//Not used
    //params
    botSocket: false,
    
    loadTex : true,
    netCollision : true,
    timeStep: 1/45,
    gravityForce : 16,

    //window
    winWidth : window.innerWidth,
    winHeight : window.innerHeight,
    aspect : window.innerWidth /  window.innerHeight,

    //spotLight
    penumbra : 0.45,
    intensity : 1.6,
    angle : 1.1,

    //light
    ambientLightIntensity: 0.38,

    //scene box
    sceneBox: {
        width: 160,
        height: 35,
        depth: 95,
        posY: 9.4,
    },

    //table
    table : {
        width: 5,
        height: 5,
        depth: 6.6,
        posY: -7.4,
    },

    //camera
    
    cameraPos : new Vector3(36, 10, 0),
    cameraRotation : new Vector3(-Math.PI / 2, Math.PI / 2 - 0.4, Math.PI / 2),
    

    //Table plane
    planeDim: {
        x: 36.17, //18.085
        y: 15.25 //7.625
    },
    netDim: {
        x: 18,
        y: 1.5
    },


   //mouse
    mouse : {
        x: 0,
        y: 0,
        oldX: 0,
        oldY: 0,
        vx : -1,
        vy : -1,
        cx : -1, //clickPos
        cy : -1,
        isClicked : false
    },

    racketHeight : 2.5,
    ballDim : 0.2,


    //utils
    frame: 0,
    changeable: { // -1 -> 1
        value : -1,
        speed : 0.02
    },

    player : playerInfo()
}


// x_f = - 0.5 g.t^2 + v_0.t + x_0
// v_f ^ 2 = v_s ^ 2 + 2.g.h
function playerInfo () : PlayerInfo {
    function getPlaneProperties(points : PlanePoints)  {
        const p1 = points.p1
        const p2 = points.p2
        const p3 = points.p3
    
        const vector1 = {
            x: p3.x - p1.x,
            y: p3.y - p1.y
        }
        const vector2 = {
            x: p2.x - p1.x,
            y: p2.y - p1.y
        }
     
        const matrix = {
            a: vector1.x, b: vector2.x,
            c: vector1.y, d: vector2.y
        }
    
        const det = 1 / (matrix.a * matrix.d - matrix.b * matrix.c)
    
        const invMatrix = {
            a: matrix.d * det, b: - matrix.b * det,
            c: - matrix.c * det, d: matrix.a * det
        }
        return {
            matrix, invMatrix
        }
    }

    const hOffset = 12
    const wOffset = 3
    const planePoints = {
        p1 : new Vector2(params.planeDim.x / 2 + hOffset, +params.planeDim.y / 2 + wOffset),
        p2 : new Vector2(params.planeDim.x / 2 + hOffset, -params.planeDim.y / 2 - wOffset),
        p3 : new Vector2(2, +params.planeDim.y / 2 + wOffset),
    }

    const planeProperties = getPlaneProperties(planePoints)

    return {
        p1: planePoints.p1,
        p2: planePoints.p2,
        p3: planePoints.p3,
        matrix: planeProperties.matrix,
        invMatrix: planeProperties.invMatrix
    }
}

// ======================================= 
// ======================================= 
// ======================================= 
// ======================================= 


