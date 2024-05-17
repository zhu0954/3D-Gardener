import * as THREE from 'three';
import { GUI } from './build/dat.gui.module.js';

export const gui = new GUI();

export const flowerOptions = {
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

export const grassOptions = {
    //colour: 0xB6D7A8,
    grassAmount: 10,
    time: 'day'
};

export const weather = {
    RainVar: 0,
    SunVar: 0,
};

gui.add(flowerOptions, 'addObject', ['Sunflower', 'Cactus', 'Zinnias', 'Lillies','Lungwort', 'Rose']).name('Add Object');
gui.add(flowerOptions, 'deleteMode').name('Delete Mode').onChange((enabled) =>{
    console.log("Delete Mode: " + (enabled ? "Enabled" : "Disabled"));
})

