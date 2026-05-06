<template>
  <div class="gallery-container">
    <!-- Estadísticas -->
    <div class="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-[15px] text-gray-600">
        Mostrando
        <span class="font-semibold text-gray-900">{{ filteredArtworks.length }}</span>
        piezas seleccionadas de
        <span class="font-semibold text-gray-900">{{ totalArtworks }}</span>
      </p>
    </div>

    <!-- Grid de Obras -->
    <div v-if="props.viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ArtworkCard
        v-for="artwork in displayedArtworks"
        :key="artwork.id"
        :artwork="artwork"
        @click="viewArtwork(artwork)"
      />
    </div>

    <!-- Lista de Obras -->
    <div v-else class="space-y-4">
      <ArtworkListItem
        v-for="artwork in displayedArtworks"
        :key="artwork.id"
        :artwork="artwork"
        @click="viewArtwork(artwork)"
      />
    </div>

    <!-- Paginación -->
    <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
      <button 
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="pagination-btn"
        :class="{ 'disabled': currentPage === 1 }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <span class="px-4 py-2 text-gray-600">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      
      <button 
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
        :class="{ 'disabled': currentPage === totalPages }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Mensaje vacío -->
    <div v-if="filteredArtworks.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron obras</h3>
      <p class="text-gray-600">Intenta cambiar los filtros o realizar una nueva búsqueda</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ArtworkCard from './ArtworkCard.vue';
import ArtworkListItem from './ArtworkListItem.vue';
import { buildDemoGallery } from '../../data/museumCollection';

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  viewMode: {
    type: String,
    default: 'grid'
  }
});

const artworks = ref([]);
const currentPage = ref(1);
const itemsPerPage = 12;

const totalArtworks = computed(() => artworks.value.length);

const filteredArtworks = computed(() => {
  let filtered = [...artworks.value];

  // Aplicar filtros
  if (props.filters.category) {
    filtered = filtered.filter(a => a.category.toLowerCase() === props.filters.category.toLowerCase());
  }
  if (props.filters.year) {
    filtered = filtered.filter(a => a.year.toString() === props.filters.year);
  }

  // Ordenar
  switch (props.filters.sortBy) {
    case 'populares':
      filtered.sort((a, b) => b.views - a.views);
      break;
    case 'mejor-valoradas':
      filtered.sort((a, b) => b.likes - a.likes);
      break;
    case 'alfabetico':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredArtworks.value.length / itemsPerPage));

const displayedArtworks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredArtworks.value.slice(start, end);
});

const viewArtwork = (artwork) => {
  // TODO: Navegar a página de detalle
  window.location.href = `/obra/${artwork.slug}`;
};

onMounted(() => {
  artworks.value = buildDemoGallery();
});
</script>

<style scoped>
.pagination-btn {
  @apply rounded-xl border border-gray-200/90 p-2.5 text-gray-600 shadow-sm transition-all hover:border-wine/40 hover:bg-white hover:text-wine hover:shadow disabled:cursor-not-allowed disabled:opacity-40;
}
</style>

