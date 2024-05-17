import * as THREE from 'three';

let rain, rainMaterial, rainGeo, rainCount = 30000, posAttr;
const vertices = [];
const velocities = [];

export function createExtremeSun() {
  var extremeSun = new THREE.DirectionalLight(0xFFFF00, 0);
  extremeSun.position.set(2, 10, 1);
  extremeSun.target.position.set(0,0,0);
  extremeSun.visible = true;
  return extremeSun;
}

export function createRain() {
  rainGeo = new THREE.BufferGeometry();
  for(let i=0;i<rainCount;i++) {
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 400 - 200;
    const z = Math.random() * 400 - 200;
    vertices.push(x,y,z);
    // velocities.push(-0.5);
  }
  rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  posAttr = rainGeo.getAttribute('position');

  rainMaterial = new THREE.PointsMaterial({
    color: 0x0a091f,
    size: 0.7,
    transparent: true
  });
  rain = new THREE.Points(rainGeo,rainMaterial);
  return rain;
}

export function getPositionAttributes() {
  return posAttr;
}

export function animateRain(vel) {
  for ( let i=0; i<posAttr.count; i++ ) {
    var y = posAttr.getY(i);  
    // var vel = -5;
    // vel -= 0.0001 + Math.random() * 0.01;
    // vel -= 1/1000;
    y += vel;
    if (y < -200) {
      y = 200;
    }
    // velocities[i] = vel;
    posAttr.setY( i, y );
  }
  return posAttr
}