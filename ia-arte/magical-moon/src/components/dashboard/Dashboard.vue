<template>
  <div class="dashboard min-h-screen bg-gray-50 pt-20">
    <!-- Not Authenticated -->
    <div v-if="!isAuthenticated" class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Acceso Restringido</h1>
      <p class="text-gray-600 mb-8">Necesitas iniciar sesión para acceder al dashboard</p>
      <a href="/auth/login" class="btn-primary">
        Iniciar Sesión
      </a>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Mi Dashboard</h1>
        <p class="text-gray-600">Gestiona tus obras, colecciones y perfil</p>
      </div>

      <!-- Tabs -->
      <div class="tabs-container mb-8">
        <button 
          @click="activeTab = 'obras'"
          :class="['tab-btn', { 'active': activeTab === 'obras' }]"
        >
          Mis Obras
          <span v-if="userStats.artworks > 0" class="badge">{{ userStats.artworks }}</span>
        </button>
        <button 
          @click="activeTab = 'colecciones'"
          :class="['tab-btn', { 'active': activeTab === 'colecciones' }]"
        >
          Colecciones
          <span v-if="userStats.collections > 0" class="badge">{{ userStats.collections }}</span>
        </button>
        <button 
          @click="activeTab = 'favoritos'"
          :class="['tab-btn', { 'active': activeTab === 'favoritos' }]"
        >
          Favoritos
          <span v-if="userStats.favorites > 0" class="badge">{{ userStats.favorites }}</span>
        </button>
        <button 
          @click="activeTab = 'perfil'"
          :class="['tab-btn', { 'active': activeTab === 'perfil' }]"
        >
          Mi Perfil
        </button>
      </div>

      <!-- Stats Cards -->
      <div v-if="activeTab === 'obras'" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stat-card">
          <div class="stat-icon">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total de Obras</p>
            <p class="stat-value">{{ userStats.artworks }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Visualizaciones</p>
            <p class="stat-value">{{ userStats.views }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Me gusta</p>
            <p class="stat-value">{{ userStats.likes }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Calificación Promedio</p>
            <p class="stat-value">{{ userStats.rating.toFixed(1) }} ⭐</p>
          </div>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Mis Obras -->
        <div v-if="activeTab === 'obras'" class="content-section">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Mis Obras</h2>
            <a href="/subir-obra" class="btn-primary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Nueva Obra
            </a>
          </div>

          <div v-if="userArtworks.length === 0" class="empty-state">
            <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <p class="text-gray-600 mb-4">Aún no has subido ninguna obra</p>
            <a href="/subir-obra" class="btn-primary">Subir Mi Primera Obra</a>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="artwork in userArtworks"
              :key="artwork.id"
              class="artwork-dashboard-card"
            >
              <a :href="`/obra/${artwork.slug}`" class="artwork-dashboard-image">
                <img :src="artwork.image" :alt="artwork.title" />
                <div class="artwork-dashboard-overlay">
                  <div class="flex gap-2">
                    <button @click.prevent="editArtwork(artwork)" class="action-icon-btn">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click.prevent="deleteArtwork(artwork.id)" class="action-icon-btn">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </a>
              <div class="artwork-dashboard-info">
                <h3 class="artwork-dashboard-title">{{ artwork.title }}</h3>
                <div class="artwork-dashboard-stats">
                  <span class="stat-item">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ artwork.views }}
                  </span>
                  <span class="stat-item">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    {{ artwork.likes }}
                  </span>
                </div>
                <span class="artwork-dashboard-status" :class="artwork.status">{{ artwork.statusLabel }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Colecciones -->
        <div v-if="activeTab === 'colecciones'" class="content-section">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Mis Colecciones</h2>
            <button @click="showCreateCollection = true" class="btn-primary">
              Nueva Colección
            </button>
          </div>
          <!-- TODO: Lista de colecciones -->
          <div class="empty-state">
            <p class="text-gray-600">Aún no has creado colecciones</p>
          </div>
        </div>

        <!-- Favoritos -->
        <div v-if="activeTab === 'favoritos'" class="content-section">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Obras Favoritas</h2>
          <!-- TODO: Lista de favoritos -->
          <div class="empty-state">
            <p class="text-gray-600">Aún no has guardado favoritos</p>
          </div>
        </div>

        <!-- Perfil -->
        <div v-if="activeTab === 'perfil'" class="content-section">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Editar Perfil</h2>
          <!-- TODO: Formulario de perfil -->
          <div class="bg-white rounded-xl p-6 border border-gray-200">
            <p class="text-gray-600">Formulario de edición de perfil (pendiente)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { coverAt } from '../../data/museumCollection';

const isAuthenticated = ref(true); // TODO: Verificar autenticación real
const activeTab = ref('obras');
const showCreateCollection = ref(false);

const VALID_TABS = ['obras', 'colecciones', 'favoritos', 'perfil'];

function applyHashToTab() {
  if (typeof window === 'undefined') return;
  const h = window.location.hash.replace(/^#/, '');
  if (VALID_TABS.includes(h)) {
    activeTab.value = h;
  }
}

const userStats = ref({
  artworks: 8,
  collections: 0,
  favorites: 12,
  views: 4500,
  likes: 320,
  rating: 4.5
});

const userArtworks = ref([
  {
    id: 1,
    title: 'Mi primera obra',
    image: coverAt(12),
    slug: 'mi-primera-obra',
    views: 1250,
    likes: 89,
    status: 'published',
    statusLabel: 'Publicada',
  },
  {
    id: 2,
    title: 'Obra en proceso',
    image: coverAt(23),
    slug: 'obra-en-proceso',
    views: 0,
    likes: 0,
    status: 'draft',
    statusLabel: 'Borrador',
  },
]);

const editArtwork = (artwork) => {
  // TODO: Navegar a edición
  console.log('Editar:', artwork);
};

const deleteArtwork = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta obra?')) {
    // TODO: Eliminar de Supabase
    userArtworks.value = userArtworks.value.filter(a => a.id !== id);
  }
};

onMounted(() => {
  applyHashToTab();
  window.addEventListener('hashchange', applyHashToTab);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', applyHashToTab);
});

watch(activeTab, (tab) => {
  if (typeof window === 'undefined') return;
  const next = `#${tab}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, '', next);
  }
});
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center gap-2 px-6 py-3 bg-wine text-white font-medium rounded-lg hover:bg-wine-dark transition-colors;
}

.tabs-container {
  @apply flex gap-2 border-b border-gray-200 overflow-x-auto;
}

.tab-btn {
  @apply px-6 py-3 font-medium text-gray-600 hover:text-wine transition-colors border-b-2 border-transparent flex items-center gap-2 whitespace-nowrap;
}

.tab-btn.active {
  @apply text-wine border-wine;
}

.badge {
  @apply px-2 py-1 text-xs font-medium bg-wine text-white rounded-full;
}

.stat-card {
  @apply bg-white rounded-xl p-6 border border-gray-200 flex items-center gap-4;
}

.stat-icon {
  @apply w-16 h-16 bg-wine/10 rounded-lg flex items-center justify-center text-wine;
}

.stat-label {
  @apply text-sm text-gray-600;
}

.stat-value {
  @apply text-2xl font-bold text-gray-900;
}

.artwork-dashboard-card {
  @apply bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow;
}

.artwork-dashboard-image {
  @apply relative block aspect-square overflow-hidden bg-gray-100;
}

.artwork-dashboard-image img {
  @apply w-full h-full object-cover;
}

.artwork-dashboard-overlay {
  @apply absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center;
}

.action-icon-btn {
  @apply p-2 bg-white text-gray-700 rounded-lg hover:bg-wine hover:text-white transition-colors;
}

.artwork-dashboard-info {
  @apply p-4;
}

.artwork-dashboard-title {
  @apply font-semibold text-gray-900 mb-2;
}

.artwork-dashboard-stats {
  @apply flex gap-4 mb-2 text-sm text-gray-600;
}

.stat-item {
  @apply flex items-center gap-1;
}

.artwork-dashboard-status {
  @apply inline-block px-2 py-1 text-xs font-medium rounded;
}

.artwork-dashboard-status.published {
  @apply bg-green-100 text-green-700;
}

.artwork-dashboard-status.draft {
  @apply bg-yellow-100 text-yellow-700;
}

.content-section {
  @apply bg-white rounded-xl p-6 border border-gray-200;
}

.empty-state {
  @apply text-center py-16;
}
</style>

