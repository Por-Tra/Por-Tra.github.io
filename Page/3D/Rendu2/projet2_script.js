// ==================== Three.js Imports ====================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ==================== Scene Setup ====================
const canvas = document.getElementById('scene3d');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance'
});

// Configuration optimale pour textures nettes
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3, 2, 5);

// ==================== Controls ====================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// ==================== Lighting ====================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(5, 8, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
scene.add(hemisphereLight);

// ==================== Ground Plane ====================
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.ShadowMaterial({ opacity: 0.3 })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// ==================== Model Loading ====================
const loader = new GLTFLoader();
loader.load(
  './système solaire.glb',
  gltf => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, 0, 0);

    gltf.scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Optimisation des textures pour rendu net
        if (child.material) {
          child.material.needsUpdate = true;

          // Configuration des textures
          if (child.material.map) {
            child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
            child.material.map.generateMipmaps = true;
            child.material.map.needsUpdate = true;
          }

          // Configuration des autres maps si présentes
          ['normalMap', 'roughnessMap', 'metalnessMap', 'aoMap'].forEach(mapType => {
            if (child.material[mapType]) {
              child.material[mapType].anisotropy = renderer.capabilities.getMaxAnisotropy();
              child.material[mapType].generateMipmaps = true;
              child.material[mapType].needsUpdate = true;
            }
          });

          // Activer le flat shading si low poly
          if (child.geometry.attributes.normal === undefined) {
            child.geometry.computeVertexNormals();
          }
        }
      }
    });

    scene.add(gltf.scene);
    animate();
  },
  // Progress
  xhr => {
    const percent = Math.round((xhr.loaded / xhr.total) * 100);
    // console.log(`Chargement : ${percent}%`);
  },
  // Error
  error => {
    console.error('Erreur de chargement:', error);
  }
);

// ==================== Responsive ====================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==================== Animation Loop ====================
let frameCount = 0;
let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  frameCount++;
  controls.update();
  renderer.render(scene, camera);
}

// ==================== Performance Monitoring ====================
setInterval(() => {
  const currentTime = performance.now();
  const fps = Math.round(frameCount / ((currentTime - lastTime) / 1000));
  frameCount = 0;
  lastTime = currentTime;
  // console.log(`FPS: ${fps}`);
}, 1000);

// ==================== Burger Menu ====================
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('show');
  burger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', e => {
  if (!burger.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('show');
    burger.classList.remove('active');
  }
});
