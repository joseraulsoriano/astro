<template>
  <div class="room-viewer min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-16 text-center">
      <svg class="animate-spin h-12 w-12 text-wine mx-auto" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600 mt-4">Cargando sala...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!room" class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Sala no encontrada</h1>
      <a href="/salas" class="text-wine hover:text-wine-dark">Volver a salas</a>
    </div>

    <!-- Room Content -->
    <div v-else class="flex flex-col h-screen">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <nav class="text-sm text-gray-600 mb-2">
            <a href="/" class="hover:text-wine">Inicio</a>
            <span class="mx-2">/</span>
            <a href="/salas" class="hover:text-wine">Salas</a>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ room.name }}</span>
          </nav>
          <h1 class="text-2xl font-bold text-gray-900">{{ room.name }}</h1>
          <p class="text-gray-600">{{ room.description }}</p>
        </div>
        <div class="flex items-center gap-4">
          <button @click="toggleFullscreen" class="header-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button @click="shareRoom" class="header-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div class="p-6">
            <!-- Room Info -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-4">
                <img 
                  v-if="room.creatorAvatar"
                  :src="room.creatorAvatar" 
                  :alt="room.creator"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <p class="font-medium text-gray-900">Creado por</p>
                  <a :href="`/artista/${room.creatorId}`" class="text-wine hover:underline">{{ room.creator }}</a>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Obras:</span>
                  <span class="font-medium text-gray-900">{{ room.artworkCount }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tema:</span>
                  <span class="font-medium text-gray-900 capitalize">{{ room.theme }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Creado:</span>
                  <span class="font-medium text-gray-900">{{ formatDate(room.createdAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Artworks List -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-4">Obras en esta sala</h3>
              <div class="space-y-3">
                <div
                  v-for="(artwork, index) in artworks"
                  :key="artwork.id"
                  @click="selectArtwork(artwork, index)"
                  :class="['artwork-item', { 'active': selectedArtworkIndex === index }]"
                >
                  <div class="artwork-item-image">
                    <img :src="artwork.image" :alt="artwork.title" />
                    <span class="artwork-item-number">{{ index + 1 }}</span>
                  </div>
                  <div class="artwork-item-info">
                    <h4 class="artwork-item-title">{{ artwork.title }}</h4>
                    <p class="artwork-item-artist">{{ artwork.artist }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- 3D Viewer -->
        <main class="flex-1 relative bg-gray-900">
          <canvas ref="canvasRef" class="room-canvas"></canvas>
          
          <!-- Controls Overlay -->
          <div class="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div class="controls-panel">
              <button @click="previousArtwork" :disabled="selectedArtworkIndex === 0" class="control-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span class="artwork-counter">{{ selectedArtworkIndex + 1 }} / {{ artworks.length }}</span>
              <button @click="nextArtwork" :disabled="selectedArtworkIndex === artworks.length - 1" class="control-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div class="controls-panel">
              <button @click="resetView" class="control-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button @click="toggleAutoRotate" :class="['control-btn', { 'active': autoRotate }]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Selected Artwork Info -->
          <div v-if="selectedArtwork" class="absolute bottom-4 left-4 right-4">
            <div class="artwork-info-panel">
              <div class="flex items-start gap-4">
                <img :src="selectedArtwork.image" :alt="selectedArtwork.title" class="artwork-info-image" />
                <div class="flex-1">
                  <h3 class="artwork-info-title">{{ selectedArtwork.title }}</h3>
                  <p class="artwork-info-artist">{{ selectedArtwork.artist }}</p>
                  <p class="artwork-info-year">{{ selectedArtwork.year }}</p>
                </div>
                <a :href="`/obra/${selectedArtwork.slug}`" class="view-artwork-btn">
                  Ver Detalles
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div class="absolute bottom-20 left-4 bg-black/70 text-white p-4 rounded-lg max-w-xs">
            <p class="text-sm mb-2 font-medium">Controles:</p>
            <ul class="text-xs space-y-1 text-gray-300">
              <li>🖱️ Click + arrastrar: Rotar cámara</li>
              <li>🔍 Scroll: Zoom</li>
              <li>⌨️ Click derecho + arrastrar: Mover</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
// TODO: Importar Three.js cuando esté instalado
// import * as THREE from 'three';

const props = defineProps({
  roomId: {
    type: String,
    required: true
  }
});

const loading = ref(true);
const room = ref(null);
const artworks = ref([]);
const selectedArtworkIndex = ref(0);
const autoRotate = ref(false);
const canvasRef = ref(null);

const selectedArtwork = computed(() => {
  return artworks.value[selectedArtworkIndex.value] || null;
});

const fetchRoom = async () => {
  loading.value = true;
  // TODO: Obtener desde Supabase
  setTimeout(() => {
    room.value = {
      id: props.roomId,
      name: 'Arte Contemporáneo 2024',
      description: 'Colección de las mejores obras contemporáneas del año',
      artworkCount: 8,
      creator: 'Museo de Arte Moderno',
      creatorId: '1',
      creatorAvatar: '/main.png',
      theme: 'moderno',
      createdAt: '2024-01-15'
    };

    artworks.value = [
      { id: 1, title: 'Obra 1', artist: 'Artista 1', year: 2024, image: '/main.png', slug: 'obra-1' },
      { id: 2, title: 'Obra 2', artist: 'Artista 2', year: 2023, image: '/1.png', slug: 'obra-2' },
      { id: 3, title: 'Obra 3', artist: 'Artista 3', year: 2024, image: '/2.png', slug: 'obra-3' },
      { id: 4, title: 'Obra 4', artist: 'Artista 4', year: 2023, image: '/main.png', slug: 'obra-4' },
      { id: 5, title: 'Obra 5', artist: 'Artista 5', year: 2024, image: '/1.png', slug: 'obra-5' }
    ];

    loading.value = false;
  }, 1000);
};

const selectArtwork = (artwork, index) => {
  selectedArtworkIndex.value = index;
  // TODO: Actualizar vista 3D
};

const nextArtwork = () => {
  if (selectedArtworkIndex.value < artworks.value.length - 1) {
    selectedArtworkIndex.value++;
  }
};

const previousArtwork = () => {
  if (selectedArtworkIndex.value > 0) {
    selectedArtworkIndex.value--;
  }
};

const resetView = () => {
  // TODO: Resetear cámara 3D
};

const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value;
  // TODO: Aplicar auto-rotación en 3D
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const shareRoom = () => {
  if (navigator.share) {
    navigator.share({
      title: room.value.name,
      text: room.value.description,
      url: window.location.href
    });
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(() => {
  fetchRoom();
  // TODO: Inicializar Three.js scene
});

onUnmounted(() => {
  // TODO: Limpiar recursos 3D
});
</script>

<style scoped>
.header-btn {
  @apply p-2 text-gray-600 hover:text-wine hover:bg-gray-100 rounded-lg transition-colors;
}

.artwork-item {
  @apply flex gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors;
}

.artwork-item.active {
  @apply bg-wine/10 border border-wine/20;
}

.artwork-item-image {
  @apply relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0;
}

.artwork-item-image img {
  @apply w-full h-full object-cover;
}

.artwork-item-number {
  @apply absolute top-1 left-1 w-5 h-5 bg-wine text-white rounded-full flex items-center justify-center text-xs font-bold;
}

.artwork-item-title {
  @apply font-semibold text-gray-900 text-sm;
}

.artwork-item-artist {
  @apply text-xs text-gray-600;
}

.room-canvas {
  @apply w-full h-full;
  display: block;
}

.controls-panel {
  @apply flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg p-2;
}

.control-btn {
  @apply p-2 text-white hover:bg-white/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.control-btn.active {
  @apply bg-wine text-white;
}

.artwork-counter {
  @apply px-3 py-1 text-white text-sm font-medium;
}

.artwork-info-panel {
  @apply bg-black/80 backdrop-blur-sm text-white rounded-lg p-4;
}

.artwork-info-image {
  @apply w-20 h-20 rounded-lg object-cover flex-shrink-0;
}

.artwork-info-title {
  @apply text-xl font-semibold mb-1;
}

.artwork-info-artist {
  @apply text-gray-300 text-sm mb-1;
}

.artwork-info-year {
  @apply text-gray-400 text-xs;
}

.view-artwork-btn {
  @apply px-4 py-2 bg-wine hover:bg-wine-dark rounded-lg transition-colors flex items-center font-medium;
}
</style>

