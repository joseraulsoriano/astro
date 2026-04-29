<template>
  <div class="search-results">
    <!-- Filtros de Tipo -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-3">
        <button
          v-for="type in searchTypes"
          :key="type.value"
          @click="selectedType = type.value"
          :class="['filter-chip', { 'active': selectedType === type.value }]"
        >
          {{ type.label }} ({{ type.count }})
        </button>
      </div>
    </div>

    <!-- Resultados -->
    <div v-if="loading" class="text-center py-16">
      <svg class="animate-spin h-12 w-12 text-wine mx-auto" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600 mt-4">Buscando...</p>
    </div>

    <div v-else-if="results.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
      <p class="text-gray-600">Intenta con otros términos de búsqueda</p>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="result in filteredResults"
        :key="result.id"
        class="result-item"
      >
        <a :href="result.url" class="flex gap-4">
          <div class="result-image">
            <img :src="result.image" :alt="result.title" />
          </div>
          <div class="result-content flex-1">
            <div class="flex items-start justify-between">
              <div>
                <span class="result-type">{{ result.type }}</span>
                <h3 class="result-title">{{ result.title }}</h3>
                <p v-if="result.description" class="result-description">{{ result.description }}</p>
                <div class="result-meta">
                  <span v-if="result.artist">{{ result.artist }}</span>
                  <span v-if="result.year"> · {{ result.year }}</span>
                  <span v-if="result.category"> · {{ result.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const selectedType = ref('all');
const loading = ref(false);
const results = ref([]);

const searchTypes = computed(() => [
  { value: 'all', label: 'Todos', count: results.value.length },
  { value: 'artwork', label: 'Obras', count: results.value.filter(r => r.type === 'Obra').length },
  { value: 'artist', label: 'Artistas', count: results.value.filter(r => r.type === 'Artista').length },
  { value: 'room', label: 'Salas', count: results.value.filter(r => r.type === 'Sala').length }
]);

const filteredResults = computed(() => {
  if (selectedType.value === 'all') return results.value;
  const typeMap = {
    artwork: 'Obra',
    artist: 'Artista',
    room: 'Sala'
  };
  return results.value.filter(r => r.type === typeMap[selectedType.value]);
});

onMounted(() => {
  // TODO: Obtener query de URL y realizar búsqueda
  // Por ahora, datos de ejemplo
  results.value = [
    {
      id: 1,
      type: 'Obra',
      title: 'Noche Estrellada',
      description: 'Famosa pintura de Vincent van Gogh',
      artist: 'Vincent van Gogh',
      year: 1889,
      category: 'Pintura',
      image: '/main.png',
      url: '/obra/noche-estrellada'
    },
    {
      id: 2,
      type: 'Artista',
      title: 'Vincent van Gogh',
      description: 'Pintor postimpresionista holandés',
      image: '/main.png',
      url: '/artista/van-gogh'
    }
  ];
});
</script>

<style scoped>
.filter-chip {
  @apply px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:border-wine hover:text-wine transition-colors;
}

.filter-chip.active {
  @apply bg-wine text-white border-wine;
}

.result-item {
  @apply bg-white border border-gray-200 rounded-xl p-4 hover:border-wine/50 hover:shadow-lg transition-all;
}

.result-image {
  @apply w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0;
}

.result-image img {
  @apply w-full h-full object-cover;
}

.result-content {
  @apply flex flex-col justify-between;
}

.result-type {
  @apply inline-block px-2 py-1 text-xs font-medium bg-wine/10 text-wine rounded mb-2;
}

.result-title {
  @apply text-xl font-semibold text-gray-900 mb-2;
}

.result-description {
  @apply text-gray-600 mb-2 line-clamp-2;
}

.result-meta {
  @apply text-sm text-gray-500;
}
</style>

