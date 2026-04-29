<template>
  <div class="search-bar-container">
    <div class="relative">
      <input
        type="search"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Buscar obras, artistas, técnicas..."
        class="w-full px-6 py-4 pl-14 pr-14 bg-white border-2 border-gray-300 rounded-lg focus:border-wine focus:outline-none text-gray-900 placeholder-gray-400 transition-colors text-lg"
        aria-label="Buscar en la galería"
        autocomplete="off"
      />
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        v-if="searchQuery"
        type="button"
        @click="clearSearch"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-wine transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
        aria-label="Limpiar búsqueda"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Resultados rápidos -->
    <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
      <div 
        v-for="suggestion in suggestions" 
        :key="suggestion.id"
        @click="selectSuggestion(suggestion)"
        class="suggestion-item"
      >
        <span class="font-medium">{{ suggestion.title }}</span>
        <span class="text-sm text-gray-500">{{ suggestion.type }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const showSuggestions = ref(false);

onMounted(() => {
  if (typeof window === 'undefined') return;
  const q = new URLSearchParams(window.location.search).get('q');
  if (q) {
    searchQuery.value = q;
    showSuggestions.value = q.length >= 2;
  }
});

const suggestions = computed(() => {
  if (searchQuery.value.length < 2) return [];
  // TODO: Conectar con API real
  return [
    { id: 1, title: 'Noche Estrellada', type: 'Obra' },
    { id: 2, title: 'Vincent van Gogh', type: 'Artista' },
    { id: 3, title: 'Pintura al óleo', type: 'Técnica' },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSearch = () => {
  showSuggestions.value = searchQuery.value.length >= 2;
};

const clearSearch = () => {
  searchQuery.value = '';
  showSuggestions.value = false;
};

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.title;
  showSuggestions.value = false;
  // TODO: Navegar a la página correspondiente
};
</script>

<style scoped>
.search-bar-container {
  position: relative;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}

.suggestion-item {
  @apply px-6 py-3 flex justify-between items-center hover:bg-wine/5 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0;
}
</style>

