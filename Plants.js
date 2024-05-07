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

export function weatherEffects (mainScene, rainOn, sunOn) {
    let toRemove = []; // hold objects to remove

      mainScene.traverse((object) => {
        if (object.name === "Plant"){
          if (rainOn) {
                object.value += (object.userData.type === "Sunflower" || object.userData.type === "Cactus") ? -0.1 : 0.1;
            }
            if (sunOn) {
                object.value += (object.userData.type === "Sunflower" || object.userData.type === "Cactus") ? 0.1 : -0.1;
            }
          console.log(object.value);
          //normalize it so its only from 0 - 100
          object.value = Math.max(0, Math.min(100, object.value));
          
          //grows the flower
          if(object.value > 50){
            let scaleIncrement = (object.value - 50) / 50;
            let newScale = object.originalScale.clone().multiplyScalar(1 + scaleIncrement * 0.25);
            object.scale.set(newScale.x, newScale.y, newScale.z);
          } else {
            object.scale.set(object.originalScale.x, object.originalScale.y, object.originalScale.z);
          }

          object.traverse((node) => {
            if (node.isMesh) { 
              if (object.value < 20 && object.value > 0) {
                node.material.color.set(0xFF0000); // Set to brown
            } else {
              node.material.color.set(0xFFFFFF); // Set to default colour
            }
          }
        });

        if(object.value <= 0){
          toRemove.push(object);
        }

        // LILY
        if (object.userData.type === "Lily" && rainOn) {
          object.position.y += 0.01;  // Move up slightly when it rains
          // limit the movement 
          object.position.y = Math.min(object.position.y, object.originalPosition.y + 1);
        } else if (object.userData.type === "Lily" && sunOn) {
          //reset position
          object.position.y = Math.max(object.originalPosition.y, object.position.y - 0.01);
        }

        //Zinnias
        if (object.userData.type === "Zinnias" && rainOn) {
          object.position.y += 0.01;  // Move up slightly when it rains
          object.position.y = Math.min(object.position.y, object.originalPosition.y + 5);
        } else if (object.userData.type === "Zinnias" && sunOn) {
          //reset position
          object.position.y = Math.max(object.originalPosition.y, object.position.y - 0.01);
        }
      } 
    });

      // Remove objects
      toRemove.forEach((object) => {
        mainScene.remove(object);
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose(); 
            object.material.dispose(); // Dispose material
          }
      });
}