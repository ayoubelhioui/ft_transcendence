import * as THREE from "three";
import { params } from "../Utils/Params";


export class MyCamera extends THREE.PerspectiveCamera {
    
    constructor() {
        super(45,
            window.innerWidth / window.innerHeight,
            0.01,
            1000)

       
        this.position.copy(params.cameraPos)
        this.rotation.setFromVector3(params.cameraRotation)
    }
}

