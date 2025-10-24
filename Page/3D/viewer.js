// Unified 3D viewer module
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Mapping friendly keys to model paths (preserve original folders)
const MODEL_MAP = {
  projet1: './Rendu1/Room_avec_texture.glb',
  projet2: './Rendu2/systeme_solaire.glb'
};

function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function populateSelector(select){
  Object.keys(MODEL_MAP).forEach(key=>{
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    select.appendChild(opt);
  });
}

function getModelPathFromKey(key){
  return MODEL_MAP[key] || null;
}

// ====== DOM ======
const canvas = document.getElementById('scene3d');
const select = document.getElementById('modelSelect');
const reloadBtn = document.getElementById('reloadBtn');

populateSelector(select);

// Default selection from query or first
const q = getQueryParam('model');
const initialKey = q && MODEL_MAP[q] ? q : Object.keys(MODEL_MAP)[0];
select.value = initialKey;

// Update URL without reloading
function updateURLForKey(key){
  const url = new URL(window.location.href);
  url.searchParams.set('model', key);
  history.replaceState(null,'',url);
}

reloadBtn.addEventListener('click', ()=>{
  const key = select.value;
  updateURLForKey(key);
  // reload scene by calling main loader
  loadModelForKey(key);
});

// Also allow change on select double-click or change
select.addEventListener('change', ()=>{
  const key = select.value;
  updateURLForKey(key);
});

// ====== Three.js common setup ======
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:false, powerPreference:'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(3,2,5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI/2;

// Lighting
scene.add(new THREE.AmbientLight(0xffffff,0.6));
const dirLight = new THREE.DirectionalLight(0xffffff,1.0);
dirLight.position.set(5,8,5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);
scene.add(new THREE.DirectionalLight(0xffffff,0.4));
scene.add(new THREE.HemisphereLight(0xffffbb,0x080820,0.3));

// Ground
const plane = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.ShadowMaterial({ opacity:0.3 }));
plane.rotation.x = -Math.PI/2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

let currentModel = null;
const loader = new GLTFLoader();

function clearCurrentModel(){
  if(!currentModel) return;
  scene.remove(currentModel);
  // dispose geometries and materials to free memory
  currentModel.traverse(child=>{
    if(child.isMesh){
      child.geometry.dispose && child.geometry.dispose();
      if(child.material){
        if(Array.isArray(child.material)){
          child.material.forEach(m=>m.dispose && m.dispose());
        }else{
          child.material.dispose && child.material.dispose();
        }
      }
    }
  });
  currentModel = null;
}

function loadModelForKey(key){
  const path = getModelPathFromKey(key);
  if(!path){
    console.error('Model key not found', key);
    return;
  }
  clearCurrentModel();

  loader.load(path, gltf=>{
    currentModel = gltf.scene;
    gltf.scene.scale.set(1,1,1);
    gltf.scene.position.set(0,0,0);

    gltf.scene.traverse(child=>{
      if(child.isMesh){
        child.castShadow = true;
        child.receiveShadow = true;

        if(child.material){
          child.material.needsUpdate = true;
          if(child.material.map){
            const maxA = renderer.capabilities.getMaxAnisotropy();
            child.material.map.anisotropy = maxA;
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
            child.material.map.generateMipmaps = true;
            child.material.map.needsUpdate = true;
          }
          ['normalMap','roughnessMap','metalnessMap','aoMap'].forEach(mapType=>{
            if(child.material[mapType]){
              child.material[mapType].anisotropy = renderer.capabilities.getMaxAnisotropy();
              child.material[mapType].generateMipmaps = true;
              child.material[mapType].needsUpdate = true;
            }
          });
          if(child.geometry && child.geometry.attributes && child.geometry.attributes.normal === undefined){
            child.geometry.computeVertexNormals();
          }
        }
      }
    });

    scene.add(gltf.scene);
  }, xhr=>{
    // progress
    if(xhr.total) console.log('Chargement', Math.round((xhr.loaded/xhr.total)*100)+'%');
  }, err=>{
    console.error('Erreur GLTF', err);
  });
}

// Responsive
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let frameCount = 0;
let lastTime = performance.now();
function animate(){
  requestAnimationFrame(animate);
  frameCount++;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Load initial
loadModelForKey(initialKey);
