import * as THREE from 'three';
import { GUI } from './build/dat.gui.module.js';

export const gui = new GUI();

export const options = {
    addObject: 'Sunflower',
    deleteMode: false,
    showSpotlightHelper: true,
    floorColor: '#aecd54',
    spotlight: {
    color: '#ffffff',
    intensity: 0.5,
    position: { x: 10, y: 40, z: 40 },
    angle: Math.PI / 6,
    penumbra: 1,
    },
    sunFlowerColor: '#ffffff',
    cactusColor: '#ffffff' ,
    zinniasColor: '#ffffff',
    lilliesColor: '#ffffff',
    lungwortColor: '#ffffff'
};

export const weather = {
    RainVar: false,
    SunVar: false,
};

export function spotlightControlsConstant(spotlight) {
    const spotlightControls = {
        color: spotlight.color.getHex(),
        intensity: spotlight.intensity,
        position: spotlight.position,
        angle: spotlight.angle,
        penumbra: spotlight.penumbra
    }
    return spotlightControls;
};

gui.add(options, 'addObject', ['Sunflower', 'Cactus', 'Zinnias', 'Lillies','Lungwort', 'Rose']).name('Add Object');
gui.add(options, 'deleteMode').name('Delete Mode').onChange((enabled) =>{
    console.log("Delete Mode: " + (enabled ? "Enabled" : "Disabled"));
})

export function createSpotlightControls(spotlight, spotlightControls) {
    const spotlightFolder = gui.addFolder('Spotlight');
    spotlightFolder.addColor(spotlightControls, 'color').name('Color').onChange(() => {
        spotlight.color.set(spotlightControls.color);
    });
    spotlightFolder.add(spotlightControls, 'intensity', 0, 1).name('Intensity').onChange(() => {
        spotlight.intensity = spotlightControls.intensity;
    });
    spotlightFolder.add(spotlightControls.position, 'x', -50, 200).name('X Position').onChange(() => {
        spotlight.position.x = spotlightControls.position.x;
    });
    spotlightFolder.add(spotlightControls.position, 'y', -50, 200).name('Y Position').onChange(() => {
        spotlight.position.y = spotlightControls.position.y;
    });
    spotlightFolder.add(spotlightControls.position, 'z', -50, 200).name('Z Position').onChange(() => {
        spotlight.position.z = spotlightControls.position.z;
    });
    spotlightFolder.add(spotlightControls, 'angle', 0, Math.PI).name('Angle').onChange(() => {
        spotlight.angle = spotlightControls.angle;
    });
    spotlightFolder.add(spotlightControls, 'penumbra', 0, 2).name('Penumbra').onChange(() => {
        spotlight.penumbra = spotlightControls.penumbra;
    });
}

