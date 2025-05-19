import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const texture = new THREE.TextureLoader().load('/twinslogov4.png'); // replace with real image
texture.center.set(0.5, 0.5);           // Rotate around center
texture.rotation = Math.PI / 2;
texture.anisotropy = 16; // optional: makes the texture sharper

const logoMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  alphaTest: 0.5, // removes fully transparent pixels, avoids edge bleeding
  side: THREE.DoubleSide
});

const radius = 4; // Adjust this based on your logo's pixel size and desired scale
const height = 0.5; // Thin disc

const geometry = new THREE.CylinderGeometry(radius, radius, height, 64);

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // side edge
  logoMaterial,
  logoMaterial // top face
];
const disc = new THREE.Mesh(geometry, materials);
disc.rotation.x = Math.PI / 2;
scene.add(disc);

camera.position.z = 10;

controls.enableDamping = true;
controls.dampingFactor = 0.1;

let userInteracting = false;
controls.addEventListener('start', () => userInteracting = true);
controls.addEventListener('end', () => userInteracting = false);

function animate() {
  requestAnimationFrame(animate);
  if (!userInteracting) {
    disc.rotation.z += 0.005;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();