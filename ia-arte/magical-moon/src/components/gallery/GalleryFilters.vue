<template>
  <div class="filters-container">
    <div class="flex flex-wrap items-center gap-4 justify-center">
      <!-- Filtro por Categoría -->
      <div class="filter-group">
        <label class="filter-label">Categoría</label>
        <select v-model="selectedCategory" @change="applyFilters" class="filter-select">
          <option value="">Todas</option>
          <option value="pintura">Pintura</option>
          <option value="escultura">Escultura</option>
          <option value="fotografia">Fotografía</option>
          <option value="digital">Arte Digital</option>
          <option value="abstracto">Abstracto</option>
        </select>
      </div>

      <!-- Filtro por Año -->
      <div class="filter-group">
        <label class="filter-label">Año</label>
        <select v-model="selectedYear" @change="applyFilters" class="filter-select">
          <option value="">Todos</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="antiguas">Anteriores</option>
        </select>
      </div>

      <!-- Ordenar por -->
      <div class="filter-group">
        <label class="filter-label">Ordenar</label>
        <select v-model="sortBy" @change="applyFilters" class="filter-select">
          <option value="recientes">Más Recientes</option>
          <option value="populares">Más Populares</option>
          <option value="mejor-valoradas">Mejor Valoradas</option>
          <option value="alfabetico">A-Z</option>
        </select>
      </div>

      <!-- Ver como -->
      <div class="filter-group">
        <button 
          @click="viewMode = 'grid'"
          :class="['view-btn', { 'active': viewMode === 'grid' }]"
          title="Vista de cuadrícula"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button 
          @click="viewMode = 'list'"
          :class="['view-btn', { 'active': viewMode === 'list' }]"
          title="Vista de lista"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Limpiar filtros -->
      <button 
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="clear-filters-btn"
      >
        Limpiar Filtros
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['filters-changed']);

const selectedCategory = ref('');
const selectedYear = ref('');
const sortBy = ref('recientes');
const viewMode = ref('grid');

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== '' || selectedYear.value !== '';
});

const applyFilters = () => {
  emit('filters-changed', {
    category: selectedCategory.value,
    year: selectedYear.value,
    sortBy: sortBy.value,
    viewMode: viewMode.value
  });
};

const clearFilters = () => {
  selectedCategory.value = '';
  selectedYear.value = '';
  sortBy.value = 'recientes';
  applyFilters();
};
</script>

<style scoped>
.filters-container {
  @apply py-4;
}

.filter-group {
  @apply flex flex-col gap-2;
}

.filter-label {
  @apply text-sm font-medium text-gray-700;
}

.filter-select {
  @apply px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-wine focus:outline-none transition-colors;
}

.view-btn {
  @apply p-2 border border-gray-300 rounded-lg text-gray-600 hover:border-wine hover:text-wine transition-colors;
}

.view-btn.active {
  @apply bg-wine text-white border-wine;
}

.clear-filters-btn {
  @apply px-4 py-2 text-sm text-gray-600 hover:text-wine transition-colors underline;
}
</style>

