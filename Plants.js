import * as THREE from 'three';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader()

//Function of cactus
export const addCactus = (mainScene, position, colour) => {
    gltfLoader.load('./Models/cactus_1/scene.gltf', (gltf) => {
      gltf.scene.position.copy(position);
      gltf.scene.name = "Plant";
      gltf.scene.userData.type = "Cactus";
      gltf.scene.value = 50; 
      gltf.scene.originalScale = new THREE.Vector3(1, 1, 1); 

      //shadows
      gltf.scene.traverse((node) => 
      {
        if (node.isMesh)
        {
          node.castShadow = true;
          node.material.color.set(colour);
        }
      });
      mainScene.add(gltf.scene);
    });
};

//Creates Sunflower
//sunflowers thrive on extreme heat
export const addSunflower = (mainScene, position, colour) => {
    gltfLoader.load('./Models/sunflower/scene.gltf', (gltf) =>{
        gltf.scene.position.copy(position);
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(270);
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.name = "Plant";
        gltf.scene.userData.type = "Sunflower";
        gltf.scene.value = 50; 
        //original Scale for rain
        gltf.scene.originalScale = new THREE.Vector3(0.1, 0.1, 0.1); 


        //shadows
        gltf.scene.traverse((node) => 
        {
        if (node.isMesh)
        {
            node.castShadow = true;
            node.material.color.set(colour);
        }
        });

        // console.log(gltf.scene)
        mainScene.add(gltf.scene);
    })
}

//Creates Zinnias
export const addZinnias = (mainScene, position, colour)=> {
    gltfLoader.load('./Models/Zinnias/scene.gltf', (gltf) =>{
      gltf.scene.position.copy(position);
      gltf.scene.position.y += 22
      gltf.scene.scale.set(0.25, 0.25, 0.25);
      gltf.scene.name = "Plant";
      gltf.scene.userData.type = "Zinnias";
      gltf.scene.originalPosition = new THREE.Vector3(position.x, position.y + 22, position.z);  // Store original position
      gltf.scene.value = 50; 
      //original Scale for rain
      gltf.scene.originalScale = new THREE.Vector3(0.25, 0.25, 0.25); 

      //shadows
      gltf.scene.traverse((node) => 
      {
        if (node.isMesh)
        {
          node.castShadow = true;
          node.material.color.set(colour);
        }
      });

      mainScene.add(gltf.scene);
    });
}

//Create lilies
//extreme rain
export const addLillies = (mainScene, position, colour)=> {
  gltfLoader.load('./Models/purple_lilies/scene.gltf', (gltf) =>{
    gltf.scene.position.copy(position);
    gltf.scene.position.y += 8.25
    gltf.scene.name = "Plant";
    gltf.scene.userData.type = "Lily";  
    gltf.scene.value = 50;
    gltf.scene.originalScale = new THREE.Vector3(1, 1, 1);
    //original Position
    gltf.scene.originalPosition = new THREE.Vector3(position.x, position.y + 8.25, position.z); 

    //shadows
    gltf.scene.traverse((node) => 
    {
      if (node.isMesh)
      {
        node.castShadow = true;
        node.material.color.set(colour);
      }
    });

    mainScene.add(gltf.scene);
  });
}

//Create Rose
export const addRose = (mainScene, position, colour)=> {
    gltfLoader.load('./Models/rose_flower/scene.gltf', (gltf) =>{
      gltf.scene.position.copy(position);
      gltf.scene.position.y += 5.3
      gltf.scene.name = "Plant";
      gltf.scene.userData.type = "Rose";
      gltf.scene.value = 50;
      gltf.scene.scale.set(2.5, 2.5, 2.5);
      gltf.scene.originalScale = new THREE.Vector3(2.5, 2.5, 2.5);

      //shadows
      gltf.scene.traverse((node) => 
      {
        if (node.isMesh)
        {
          node.castShadow = true;
          node.material.color.set(colour);
        }
      });

      mainScene.add(gltf.scene);
    });
}

//Create Lungwort
//rain
export const addLungwort = (mainScene, position, colour) => {
  gltfLoader.load('./Models/Lungwort/scene.gltf', (gltf) =>{
    gltf.scene.position.copy(position);
    gltf.scene.scale.set(20,20,20);
    gltf.scene.name = "Plant";
    gltf.scene.userData.type = "Lungwort";
    gltf.scene.value = 50; 
    //original Scale for rain
    gltf.scene.originalScale = new THREE.Vector3(20, 20, 20); 

    //shadows
    gltf.scene.traverse((node) => 
    {
      if (node.isMesh)
      {
        node.castShadow = true;
        node.material.color.set(colour);
      }
    });

    mainScene.add(gltf.scene);
  });
}