import * as THREE from 'three';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

//GRASS GENERATION

var grassTotal = 0; //total grass
var grasses = []; //array of grass in the scene

var addGrass = function(mainScene) {
    const loader = new GLTFLoader().setPath('Models/realistics_grass_03/');
    loader.load('scene.gltf', (gltf) => {
        const grass = gltf.scene;
        mainScene.add(grass);
        grass.scale.set(5, 5, 5);
        var posx = Math.random() * 125 - 65.5;
        var posy = Math.random() * 125 - 65.5;
        grass.position.set(posx,0.25,posy);
        grasses.push(grass);
    })
}

//randomise grass & handles adding/removing them
export function grassRandomiser(grassAmount, mainScene) {
    if(grassAmount > grasses.length){
        while(grassTotal < grassAmount){
            addGrass(mainScene);
            grassTotal++;
        }
    }

    if(grassAmount < grasses.length){
        while (grassTotal > grassAmount) {
            for(var i = grasses.length - 1; i >= grassAmount; i--){
                var removing = grasses[i];
                mainScene.remove(removing);
                grasses.pop();
                grassTotal--;
            }
        }
    }
}