// Plants.js
import * as THREE from 'three';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader()

// Function of cactus
export const addCactus = (mainScene, position, colour) => {
    gltfLoader.load('./Models/cactus_1/scene.gltf', (gltf) => {
      gltf.scene.position.copy(position);
      gltf.scene.name = "Plant";
      gltf.scene.userData.type = "Cactus";
      gltf.scene.value = 50; 
      gltf.scene.originalScale = new THREE.Vector3(2, 2, 2); // Updated scale

      // shadows
      gltf.scene.traverse((node) => 
      {
        if (node.isMesh)
        {
          node.castShadow = true;
          node.material.color.set(colour);
        }
      });
      gltf.scene.scale.set(2, 2, 2); // Apply updated scale
      mainScene.add(gltf.scene);
    });
};

// Creates Sunflower
// sunflowers thrive on extreme heat
export const addSunflower = (mainScene, position, colour) => {
    gltfLoader.load('./Models/sunflower/scene.gltf', (gltf) =>{
        gltf.scene.position.copy(position);
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(45);
        gltf.scene.scale.set(0.2, 0.2, 0.2); // Updated scale
        gltf.scene.name = "Plant";
        gltf.scene.userData.type = "Sunflower";
        gltf.scene.value = 50; 
        gltf.scene.originalScale = new THREE.Vector3(0.2, 0.2, 0.2); // Updated scale

        // shadows
        gltf.scene.traverse((node) => 
        {
        if (node.isMesh)
        {
            node.castShadow = true;
            node.material.color.set(colour);
        }
        });

        mainScene.add(gltf.scene);
    })
};

// Creates Zinnias
export const addZinnias = (mainScene, position, colour)=> {
    gltfLoader.load('./Models/Zinnias/scene.gltf', (gltf) =>{
      gltf.scene.position.copy(position);
      gltf.scene.position.y += 45; // Adjusted position to keep the tip above the dirt
      gltf.scene.scale.set(0.5, 0.5, 0.5); // Updated scale
      gltf.scene.name = "Plant";
      gltf.scene.userData.type = "Zinnias";
      gltf.scene.originalPosition = new THREE.Vector3(position.x, position.y + 45, position.z);  // Store original position
      gltf.scene.value = 50; 
      gltf.scene.originalScale = new THREE.Vector3(0.5, 0.5, 0.5); // Updated scale

      // shadows
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

// Create lilies
export const addLillies = (mainScene, position, colour)=> {
  gltfLoader.load('./Models/purple_lilies/scene.gltf', (gltf) =>{
    gltf.scene.position.copy(position);
    gltf.scene.position.y += 16.5; // Adjusted position to keep the tip above the dirt
    gltf.scene.name = "Plant";
    gltf.scene.userData.type = "Lily";  
    gltf.scene.value = 50;
    gltf.scene.scale.set(2, 2, 2); // Updated scale
    gltf.scene.originalScale = new THREE.Vector3(2, 2, 2); // Updated scale
    gltf.scene.originalPosition = new THREE.Vector3(position.x, position.y + 16.5, position.z); 

    // shadows
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

// Create Rose
export const addRose = (mainScene, position, colour)=> {
    gltfLoader.load('./Models/rose_flower/scene.gltf', (gltf) =>{
      gltf.scene.position.copy(position);
      gltf.scene.position.y += 5.3
      gltf.scene.name = "Plant";
      gltf.scene.userData.type = "Rose";
      gltf.scene.value = 50;
      gltf.scene.scale.set(5, 5, 5); // Updated scale
      gltf.scene.originalScale = new THREE.Vector3(5, 5, 5); // Updated scale

      // shadows
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

// Create Lungwort
export const addLungwort = (mainScene, position, colour) => {
  gltfLoader.load('./Models/Lungwort/scene.gltf', (gltf) =>{
    gltf.scene.position.copy(position);
    gltf.scene.scale.set(40, 40, 40); // Updated scale
    gltf.scene.name = "Plant";
    gltf.scene.userData.type = "Lungwort";
    gltf.scene.value = 50; 
    gltf.scene.originalScale = new THREE.Vector3(40, 40, 40); // Updated scale

    // shadows
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
  var sunRate = 0.2 * sunOn / 100;
  var rainRate = 0.2 * rainOn / 100;

  mainScene.traverse((object) => {
    if (object.name === "Plant"){
      if (rainOn) {
        object.value += (object.userData.type === "Sunflower" || object.userData.type === "Cactus") ? -rainRate : rainRate;
      }
      if (sunOn) {
        object.value += (object.userData.type === "Sunflower" || object.userData.type === "Cactus") ? sunRate : -sunRate;
      }
      // console.log(object.value);
      // normalize it so its only from 0 - 100
      object.value = Math.max(0, Math.min(100, object.value));

      // grows/shrinks the flower
      let scaleIncrement = (object.value - 50) / 50;
      let newScale = object.originalScale.clone().multiplyScalar(1 + scaleIncrement * 0.25);
      object.scale.set(newScale.x, newScale.y, newScale.z);

      object.traverse((node) => {
        if (node.isMesh) { 
          if (object.value < 20) {
            node.material.color.set(0xFF0000); // Set to brown
          } else {
            node.material.color.set(0xFFFFFF); // Set to default colour
          }
        }
      });

      if(object.value <= 0){
        toRemove.push(object);
      }

      // Lillies
      if (object.userData.type === "Lily" && rainOn) {
        object.position.y += 0.01 * rainRate/0.2; // Move up slightly when it rains
        // limit the movement 
        object.position.y = Math.min(object.position.y, object.originalPosition.y + 2.5);
      } else if (object.userData.type === "Lily" && sunOn) {
        object.position.y -= 0.006 * sunRate/0.2; // Move up slightly when its sunny
        // limit the movement
        object.position.y = Math.max(object.position.y, object.originalPosition.y - 1.5);  
      }

      // Zinnias
      if (object.userData.type === "Zinnias" && rainOn) {
        object.position.y += 0.02 * rainRate/0.2; // Move up slightly when it rains
        object.position.y = Math.min(object.position.y, object.originalPosition.y + 5);
      } else if (object.userData.type === "Zinnias" && sunOn) {
        object.position.y -= 0.02 * sunRate/0.2; // Move up slightly when its sunny
        // limit the movement
        object.position.y = Math.max(object.position.y, object.originalPosition.y - 5);  
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

  export function removeAllPlants(mainScene) {
    let toRemove = []; // hold objects to remove
    mainScene.traverse((object) => {
      if (object.name === "Plant"){
        toRemove.push(object);
      }
    });

    toRemove.forEach((object) => {
      mainScene.remove(object);
      if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose(); 
            object.material.dispose(); // Dispose material
        }
    });
  }
