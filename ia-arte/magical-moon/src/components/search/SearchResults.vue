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
            <img :src="result.image" :alt="result.title" loading="lazy" referrerpolicy="no-referrer" />
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
import { buildDemoArtists, buildDemoGallery, buildDemoRooms } from '../../data/museumCollection';

const selectedType = ref('all');
const loading = ref(false);
const results = ref([]);

function buildAllResults() {
  const obras = buildDemoGallery().map((p) => ({
    id: `art-${p.id}`,
    type: 'Obra',
    title: p.title,
    description: p.description || `${p.category}, ${p.year}.`,
    artist: p.artist,
    year: p.year,
    category: p.category,
    image: p.image,
    url: `/obra/${p.slug}`,
  }));

  const autores = buildDemoArtists().map((a) => ({
    id: `artist-${a.id}`,
    type: 'Artista',
    title: a.name,
    description: `${a.role} · ${a.artworkCount} obras en colección demo.`,
    artist: '',
    year: null,
    category: a.role,
    image: a.avatar,
    url: `/artista/${a.id}`,
  }));

  const salas = buildDemoRooms().map((r) => ({
    id: `room-${r.id}`,
    type: 'Sala',
    title: r.name,
    description: r.description,
    artist: r.creator,
    year: null,
    category: r.theme,
    image: r.image,
    url: `/sala/${r.id}`,
  }));

  return [...obras, ...autores, ...salas];
}

function filterByQuery(all, qRaw) {
  const q = qRaw?.trim().toLowerCase();
  if (!q) return all;
  return all.filter((r) => {
    const blob = [r.title, r.description, r.artist, r.category, r.type, String(r.year ?? '')]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return blob.includes(q);
  });
}

const searchTypes = computed(() => [
  { value: 'all', label: 'Todos', count: results.value.length },
  { value: 'artwork', label: 'Obras', count: results.value.filter((r) => r.type === 'Obra').length },
  { value: 'artist', label: 'Artistas', count: results.value.filter((r) => r.type === 'Artista').length },
  { value: 'room', label: 'Salas', count: results.value.filter((r) => r.type === 'Sala').length },
]);

const filteredResults = computed(() => {
  if (selectedType.value === 'all') return results.value;
  const typeMap = {
    artwork: 'Obra',
    artist: 'Artista',
    room: 'Sala',
  };
  return results.value.filter((r) => r.type === typeMap[selectedType.value]);
});

onMounted(() => {
  const all = buildAllResults();
  if (typeof window === 'undefined') {
    results.value = all;
    return;
  }
  const q = new URLSearchParams(window.location.search).get('q');
  results.value = filterByQuery(all, q ?? '');
});
</script>

<style scoped>
.filter-chip {
  @apply rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-wine/50 hover:text-wine;
}

.filter-chip.active {
  @apply border-wine bg-wine text-white shadow-sm;
}

.result-item {
  @apply rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-wine/35 hover:shadow-md;
}

.result-image {
  @apply h-24 w-24 shrink-0 overflow-hidden rounded-2xl rounded-br-md bg-slate-100;
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

