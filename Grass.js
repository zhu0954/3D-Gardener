import * as THREE from 'three';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

// TEXTURES
var base;
var path;
var dirt;

function baseCreator(scene) {
    const texture = new THREE.TextureLoader();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const colorTex = texture.load('textures/bestgrass/Grass004_4K-JPG_Color.jpg');
    const dispTex = texture.load('textures/bestgrass/Grass004_4K-JPG_Displacement.jpg');
    const nrmTex = texture.load('textures/bestgrass/Grass004_4K-JPG_NormalDX.jpg');
    const occTex = texture.load('textures/bestgrass/Grass004_4K-JPG_AmbientOcclusion.jpg');
    const roughTex = texture.load('textures/bestgrass/Grass004_4K-JPG_Roughness.jpg');
    const basegeo = new THREE.PlaneGeometry(142.86, 142.86);
    const basemat = new THREE.MeshStandardMaterial({
        map: colorTex,
        normalMap: nrmTex,
        displacementMap: dispTex,
        roughnessMap: roughTex,
        aoMap: occTex,
        side: THREE.DoubleSide,
    });

    base = new THREE.Mesh(basegeo, basemat);
    base.rotation.x = -Math.PI / 2;
    base.position.y = 1;
    base.receiveShadow = true;
    base.name = "Base";
    scene.add(base);
}

export function getBase(){
    return base;
}

function pathCreator(scene) {
    const texture = new THREE.TextureLoader();
    const colorTexS = texture.load('textures/path/PavingStones138_4K-JPG_Color.jpg');
    const dispTexS = texture.load('textures/path/PavingStones138_4K-JPG_Displacement.jpg');
    const nrmTexS = texture.load('textures/path/PavingStones138_4K-JPG_NormalDX.jpg');
    const occTexS = texture.load('textures/path/PavingStones138_4K-JPG_AmbientOcclusion.jpg');
    const roughTexS = texture.load('textures/path/PavingStones138_4K-JPG_Roughness.jpg');
    const pathgeoS = new THREE.PlaneGeometry(189.28, 189.28);
    const pathmatS = new THREE.MeshStandardMaterial({
        map: colorTexS,
        normalMap: nrmTexS,
        displacementMap: dispTexS,
        roughnessMap: roughTexS,
        aoMap: occTexS,
        side: THREE.DoubleSide,
    });

    path = new THREE.Mesh(pathgeoS, pathmatS);
    path.rotation.x = -Math.PI / 2;
    path.position.y = 0.5;
    path.receiveShadow = true;
    path.name = "Path"
    scene.add(path);
}

export function getPath(){
    return path;
}

function dirtCreator(scene) {
    const texture = new THREE.TextureLoader();
    const colorTexD = texture.load('textures/dirt/Ground048_4K-JPG_Color.jpg');
    const dispTexD = texture.load('textures/dirt/Ground048_4K-JPG_Displacement.jpg');
    const nrmTexD = texture.load('textures/dirt/Ground048_4K-JPG_NormalDX.jpg');
    const occTexD = texture.load('textures/dirt/Ground048_4K-JPG_AmbientOcclusion.jpg');
    const roughTexD = texture.load('textures/dirt/Ground048_4K-JPG_Roughness.jpg');
    const dirtgeoD = new THREE.PlaneGeometry(250, 250);
    const dirtmatD = new THREE.MeshStandardMaterial({
        map: colorTexD,
        normalMap: nrmTexD,
        displacementMap: dispTexD,
        roughnessMap: roughTexD,
        aoMap: occTexD,
        side: THREE.DoubleSide,
    });

    dirt = new THREE.Mesh(dirtgeoD, dirtmatD);
    dirt.rotation.x = -Math.PI / 2;
    dirt.position.y = 0;
    dirt.name = "Dirt";
    dirt.receiveShadow = true;
    scene.add(dirt);
}

export function getDirt(){
    return dirt;
}

export function gardenCreator(scene) {
    baseCreator(scene);
    pathCreator(scene);
    dirtCreator(scene);
}

//GRASS GENERATION

var grassTotal = 0; //total grass
var grasses = []; //array of grass in the scene

var sizeX = 125;
var sizeZ = 125;

export function updateGrass(baseSizeX, baseSizeZ){
    sizeX = baseSizeX;
    sizeZ = baseSizeZ;
    console.log("baseX: " + baseSizeX);
}

var addGrass = function(mainScene) {
    const loader = new GLTFLoader().setPath('Models/realistics_grass_03/');
    loader.load('scene.gltf', (gltf) => {
        const grass = gltf.scene;
        mainScene.add(grass);
        grass.scale.set(5, 5, 5);
        var posx87 = sizeX * 0.8745;
        var posz87 = sizeZ * 0.8745;
        var posx = Math.random() * posx87 - (posx87/2);
        var posy = Math.random() * posz87 - (posz87/2);
        //var posx = Math.random() * 125 - 65.5;
        //var posy = Math.random() * 125 - 65.5;
        grass.position.set(posx,0.25,posy);
        grasses.push(grass);
    })
}

export function removeAllGrass(mainScene) {
    while(grasses.length > 0){
        var removing = grasses.pop();
        mainScene.remove(removing);
        grassTotal--;
    }
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

export function storeOriginalColors(object, ogCol) {
    object.traverse((child) => {
        if (child.isMesh) {
            ogCol.set(child.uuid, child.material.color.clone());
        }
    });
}

export function changeColor(object, color) {
    object.traverse((child) => {
        if (child.isMesh)
            child.material.color.set(color);
    });
}
 
export function revertColors(object, ogCol) {
    object.traverse((child) => {
        if (child.isMesh && ogCol.has(child.uuid))
            child.material.color.copy(ogCol.get(child.uuid));
    });
}