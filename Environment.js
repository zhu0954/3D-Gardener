import * as THREE from 'three';

export function addRooftopElements(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Adding dirt surface
    const colorTexD = textureLoader.load('textures/dirt/Ground048_4K-JPG_Color.jpg');
    const dispTexD = textureLoader.load('textures/dirt/Ground048_4K-JPG_Displacement.jpg');
    const nrmTexD = textureLoader.load('textures/dirt/Ground048_4K-JPG_NormalDX.jpg');
    const occTexD = textureLoader.load('textures/dirt/Ground048_4K-JPG_AmbientOcclusion.jpg');
    const roughTexD = textureLoader.load('textures/dirt/Ground048_4K-JPG_Roughness.jpg');
    const dirtgeoD = new THREE.PlaneGeometry(250, 250);
    const dirtmatD = new THREE.MeshStandardMaterial({
        map: colorTexD,
        normalMap: nrmTexD,
        displacementMap: dispTexD,
        roughnessMap: roughTexD,
        aoMap: occTexD,
        side: THREE.DoubleSide,
    });

    const dirt = new THREE.Mesh(dirtgeoD, dirtmatD);
    dirt.rotation.x = -Math.PI / 2;
    dirt.position.y = 0;
    dirt.name = "Dirt";
    dirt.receiveShadow = true;
    scene.add(dirt);

    // Adding rooftop edges
    const edgeGeo = new THREE.BoxGeometry(260, 10, 5);
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x555555 });

    const frontEdge = new THREE.Mesh(edgeGeo, edgeMat);
    frontEdge.position.set(0, 5, -127.5);
    frontEdge.receiveShadow = true;
    scene.add(frontEdge);

    const backEdge = new THREE.Mesh(edgeGeo, edgeMat);
    backEdge.position.set(0, 5, 127.5);
    backEdge.receiveShadow = true;
    scene.add(backEdge);

    const sideGeo = new THREE.BoxGeometry(5, 10, 250);
    const leftEdge = new THREE.Mesh(sideGeo, edgeMat);
    leftEdge.position.set(-127.5, 5, 0);
    leftEdge.receiveShadow = true;
    scene.add(leftEdge);

    const rightEdge = new THREE.Mesh(sideGeo, edgeMat);
    rightEdge.position.set(127.5, 5, 0);
    rightEdge.receiveShadow = true;
    scene.add(rightEdge);

}

export function addBuilding(scene) {
    const buildingGeo = new THREE.BoxGeometry(250, 400, 250);
    const buildingMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    var buildingTexture = new THREE.TextureLoader().load('textures/BrickBuilding.jpg');
    buildingMat.map = buildingTexture;
    buildingTexture.wrapS = buildingTexture.wrapT = THREE.RepeatWrapping;
    buildingTexture.repeat = new THREE.Vector2(2, 1);
    const building = new THREE.Mesh(buildingGeo, buildingMat);
    building.position.set(0, -200, 0);
    building.receiveShadow = true;
    scene.add(building);
}

export function naturalLight() {
    const sun = new THREE.DirectionalLight(0xFFF49E, 1);
    sun.position.set(50, 80, -50);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024; 
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5; 
    sun.shadow.camera.far = 750;
    sun.shadow.camera.left = -200;
    sun.shadow.camera.right = 200;
    sun.shadow.camera.top = 250;
    sun.shadow.camera.bottom = -250;
    sun.name = "Sun";

    const moon = new THREE.PointLight(0x4D7DDD, 0.5);
    moon.position.set(50, 80, 50);
    moon.name = "Moon"

    const ambientLight1 = new THREE.AmbientLight(new THREE.Color(0.5,0.5,0.5), 0.6);
    ambientLight1.name = "Day Ambient Light";
    const ambientLight2 = new THREE.AmbientLight(new THREE.Color(0.5,0.5,0.5), 0.3);
    ambientLight2.name = "Night Ambient Light";
    
    return [sun, moon, ambientLight1, ambientLight2];
}

export function theTime(time, natLight, renderer, rain) {
    var sun = natLight[0];
    var moon = natLight[1];
    var ambientLight1 = natLight[2];
    var ambientLight2 = natLight[3];
    if(time==="day"){
        sun.visible = true;
        ambientLight1.visible = true;
        moon.visible = false;
        ambientLight2.visible = false;
    }
    else {
        sun.visible = false;
        ambientLight1.visible = false;
        moon.visible = true;
        ambientLight2.visible = true;
        if(rain)
            renderer.setClearColor(0x101f2b);
        else
            renderer.setClearColor(0x0d0d0d);
    }    
}