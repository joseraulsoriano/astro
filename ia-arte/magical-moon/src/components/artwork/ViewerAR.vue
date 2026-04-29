<template>
  <div class="viewer-ar-container">
    <video ref="videoRef" class="ar-video" autoplay playsinline></video>
    <canvas ref="canvasRef" class="ar-canvas"></canvas>
    
    <div class="ar-controls">
      <div class="ar-info">
        <p class="text-sm font-medium text-gray-900 mb-2">Realidad Aumentada</p>
        <p class="text-xs text-gray-600 mb-4">
          Coloca la obra en tu espacio. Mueve tu dispositivo para ver la obra desde diferentes ángulos.
        </p>
        <button @click="startAR" v-if="!isARActive" class="start-ar-btn">
          Iniciar AR
        </button>
        <button @click="stopAR" v-else class="stop-ar-btn">
          Detener AR
        </button>
      </div>
    </div>

    <!-- Fallback message -->
    <div v-if="!isARSupported" class="ar-fallback">
      <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <p class="text-gray-700 font-medium mb-2">AR no disponible en este dispositivo</p>
      <p class="text-sm text-gray-600">
        Para usar AR, necesitas un dispositivo móvil con cámara y soporte WebXR
      </p>
      <a href="/galeria" class="mt-4 inline-block text-wine hover:text-wine-dark">
        Ver en 3D →
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

const props = defineProps({
  modelUrl: {
    type: String,
    required: true
  }
});

const videoRef = ref(null);
const canvasRef = ref(null);
const isARActive = ref(false);
const isARSupported = ref(false);

let scene, camera, renderer, model, controller;

onMounted(() => {
  checkARSupport();
});

onUnmounted(() => {
  stopAR();
});

const checkARSupport = async () => {
  if (navigator.xr) {
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    isARSupported.value = supported;
  } else {
    isARSupported.value = false;
  }
};

const initAR = () => {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;

  // Load model
  const loader = new GLTFLoader();
  loader.load(
    props.modelUrl,
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      model.position.set(0, 0, -1);
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error('Error loading AR model:', error);
    }
  );

  // Controller
  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);

  // Start AR session
  navigator.xr.requestSession('immersive-ar', {
    requiredFeatures: ['local', 'hit-test']
  }).then((session) => {
    renderer.xr.setSession(session);
    isARActive.value = true;
    
    session.addEventListener('end', () => {
      isARActive.value = false;
    });
  }).catch((error) => {
    console.error('Error starting AR session:', error);
    isARSupported.value = false;
  });

  // Animation loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

const startAR = () => {
  if (isARSupported.value) {
    initAR();
  }
};

const stopAR = () => {
  if (renderer && renderer.xr && renderer.xr.getSession()) {
    renderer.xr.getSession().end();
    isARActive.value = false;
  }
};

const onSelect = () => {
  // Place model on tap
  if (model && controller) {
    const position = new THREE.Vector3();
    controller.getWorldPosition(position);
    model.position.copy(position);
  }
};
</script>

<style scoped>
.viewer-ar-container {
  @apply relative w-full bg-black rounded-lg overflow-hidden;
  min-height: 500px;
}

.ar-video {
  @apply absolute inset-0 w-full h-full object-cover opacity-0;
}

.ar-canvas {
  @apply absolute inset-0 w-full h-full;
  display: block;
}

.ar-controls {
  @apply absolute bottom-4 left-4 right-4;
}

.ar-info {
  @apply bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg;
}

.start-ar-btn {
  @apply w-full px-6 py-3 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors font-medium;
}

.stop-ar-btn {
  @apply w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium;
}

.ar-fallback {
  @apply absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-center p-8;
}
</style>

