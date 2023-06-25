import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from "three";

import wallsTex from '../../assets/images/2.jpg'
import groundTex from '../../assets/images/4.jpg'
import { LoaderResult } from '../interfaces/interface.load.result';



//Walls Texture
function tex(texture : THREE.Texture, index : number) {
    const spriteSize = new THREE.Vector2(texture.image.width, texture.image.width / 4); // Size of each sprite

    // Calculate the sprite's UV coordinates based on its index
    const spriteIndex = index; // Index of the sprite you want to load
    const rowSize = texture.image.width / spriteSize.x;
    const column = Math.floor(spriteIndex / rowSize);
    const row = spriteIndex % rowSize;

    const spriteWidth = 1 / rowSize;
    const spriteHeight = 1 / (texture.image.height / spriteSize.y);

    // Create a texture region for the specific sprite
    texture.offset.set(row * spriteWidth, column * spriteHeight);
    texture.repeat.set(spriteWidth, spriteHeight);
    texture.colorSpace = THREE.SRGBColorSpace;
    
    return (texture)
}

//Floor Texture
function floorText(texture : THREE.Texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    return (texture)
}

function loadTexture(url : string) {
    return new Promise((resolve, reject) => {
      const textureLoader = new THREE.TextureLoader();
  
      textureLoader.load(
        url,
        resolve, // Resolve the promise when the texture is loaded
        undefined, // No progress callback
        reject // Reject the promise if there is an error
      );
    });
  }

//===================================
//===================================
//===================================


async function load3dObjects() {
    const assetLoader = new GLTFLoader()
    
    const tableUrl = new URL('../../assets/models/table.glb', import.meta.url)
    const racketUrl = new URL('../../assets/models/racket.glb', import.meta.url)

    return  {
        table : await assetLoader.loadAsync(tableUrl.href),
        racket : await assetLoader.loadAsync(racketUrl.href)
    }
}

async function loadTextures() {
    const textureUrls = [
        wallsTex,
        groundTex,
    ];

    const textures = (await Promise.all(textureUrls.map((url) => loadTexture(url))) as THREE.Texture[])


    return {
        backWall : {
            //tex :  floorText(textures[0])
            tex :  tex(textures[0].clone() , 0),
            //normalMap : tex(textures[1].clone(), 0),
            //normalMap : tex(textures[2].clone(), 0),
        },
        frontWall : {
            //tex : floorText(textures[0])
            tex : tex(textures[0].clone(), 2),
            //normalMap : tex(textures[1].clone(), 2),
            //normalMap : tex(textures[2].clone(), 2),
            //displacementMap : tex(textures[3].clone(), 2),
        },
        leftWall : {
            //tex: floorText(textures[0])
            tex: tex(textures[0].clone(), 3),
            //normalMap : tex(textures[1].clone(), 3),
            //normalMap : tex(textures[2].clone(), 3),
        },
        rightWall : {
            //tex: floorText(textures[0])
            tex: tex(textures[0].clone(), 1),
            //normalMap : tex(textures[1].clone(), 1),
            //normalMap : tex(textures[2].clone(), 1),
        },
        floor : {
            tex: floorText(textures[1]),
            //normalMap : floorText(textures[4]),
        }
    }
}

async function load() {
    const models = await load3dObjects()
    const textures = await loadTextures()
    console.log("Loading textures and models complete")
    return {
        models,
        tex : textures
    }
}

export {
    load
}
