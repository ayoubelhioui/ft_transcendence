import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface Item {
    tex : THREE.Texture
}


export interface LoaderResult { 
    models: {
        table : GLTF,
        racket : GLTF,
    }
    tex: {
        backWall : Item,
        frontWall : Item,
        leftWall : Item,
        rightWall : Item,
        floor : Item,
    }
}
