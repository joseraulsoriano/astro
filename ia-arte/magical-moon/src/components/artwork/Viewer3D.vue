<template>
  <div class="viewer-3d-container">
    <canvas ref="canvasRef" class="canvas-3d"></canvas>
    <div class="controls-overlay">
      <div class="controls-info">
        <p class="text-sm text-gray-600 mb-2">Controles de Cámara:</p>
        <ul class="text-xs text-gray-500 space-y-1">
          <li>🖱️ Click y arrastrar: Rotar</li>
          <li>🔍 Scroll: Zoom</li>
          <li>⌨️ Click derecho + arrastrar: Pan</li>
        </ul>
      </div>
      <button @click="resetCamera" class="reset-btn">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reiniciar Vista
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const props = defineProps({
  modelUrl: {
    type: String,
    required: true
  },
  cameraControls: {
    type: Boolean,
    default: true
  }
});

const canvasRef = ref(null);
let scene, camera, renderer, controls, model;

onMounted(() => {
  initScene();
  loadModel();
  animate();
});

onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
  }
});

const initScene = () => {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    canvasRef.value.clientWidth / canvasRef.value.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value,
    antialias: true 
  });
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
  renderer.shadowMap.enabled = true;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Controls
  if (props.cameraControls) {
    controls = new OrbitControls(camera, canvasRef.value);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;
  }

  // Handle resize
  window.addEventListener('resize', onWindowResize);
};

const loadModel = () => {
  const loader = new GLTFLoader();
  
  loader.load(
    props.modelUrl,
    (gltf) => {
      model = gltf.scene;
      
      // Center and scale model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      model.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim;
      model.scale.multiplyScalar(scale);
      
      scene.add(model);
    },
    (progress) => {
      console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('Error loading model:', error);
      // Fallback: show message
      const message = document.createElement('div');
      message.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600';
      message.textContent = 'Error cargando modelo 3D';
      canvasRef.value.parentElement.appendChild(message);
    }
  );
};

const animate = () => {
  requestAnimationFrame(animate);
  
  if (controls) {
    controls.update();
  }
  
  renderer.render(scene, camera);
};

const resetCamera = () => {
  if (camera && controls) {
    camera.position.set(0, 1, 3);
    controls.reset();
  }
};

const onWindowResize = () => {
  if (canvasRef.value && camera && renderer) {
    camera.aspect = canvasRef.value.clientWidth / canvasRef.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
  }
};
</script>

<style scoped>
.viewer-3d-container {
  @apply relative w-full bg-gray-100 rounded-lg overflow-hidden;
  min-height: 500px;
}

.canvas-3d {
  @apply w-full h-full;
  display: block;
}

.controls-overlay {
  @apply absolute top-4 right-4 flex flex-col gap-2;
}

.controls-info {
  @apply bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-left max-w-xs;
}

.reset-btn {
  @apply px-4 py-2 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors flex items-center gap-2 text-sm;
}
</style>

