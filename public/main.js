import * as THREE from "three";

const N_cube = 100;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.set( 0, 0, 8 );
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#loader").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

const cubes = [];
const params = [];
for(var i = 0; i < N_cube; i++) {
  const theta = 2 * Math.PI * Math.random();
  const r = 1.3 + 0.5 * Math.random();
  const omegaX = 2 * Math.random();
  const omegaY = 2 * Math.random();
  const omegaZ = 2 * Math.random();

  cubes.push(makeInstance(geometry, theta, r));
  params.push({
    theta: theta,
    r: r,
    omegaX: omegaX,
    omegaY: omegaY,
    omegaZ: omegaZ
  });
}

function makeInstance(geometry, theta, r) {
  const material = new THREE.MeshPhongMaterial( {color: 0x44aa88} );

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = r * Math.cos(theta);
  cube.position.y = r * Math.sin(theta);

  return cube;
}


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

// camera.position.z = 5;

function render(time) {
  time *= 0.001;

  for (var i = 0; i < N_cube; i++) {
    const cube = cubes[i];

    params[i].theta = (params[i].theta + 0.01) % (2*Math.PI);
    const theta = params[i].theta;
    const r = params[i].r;
    const omegaX = params[i].omegaX;
    const omegaY = params[i].omegaY;
    const omegaZ = params[i].omegaZ;

    cube.position.x = r * Math.cos(theta);
    cube.position.z = r * Math.sin(theta);

    cube.rotation.x = 1 * omegaX * time;
    cube.rotation.y = 1 * omegaY * time;
    cube.rotation.z = 1 * omegaZ * time;
  }

  renderer.render(scene, camera);
  if (time > 2) {
    return;
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);


// const material = new THREE.LineBasicMaterial( {color: 0x0000ff} );

// const points = [];
// points.push( new THREE.Vector3(-10, 0, 0) );
// points.push( new THREE.Vector3(0, 10, 0) );
// points.push( new THREE.Vector3(10, 0, 0) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry, material );

// scene.add(line);
// renderer.render(scene, camera);
