<template>
  <div class="search-bar-container">
    <form class="relative" @submit.prevent="goSearch">
      <div
        class="flex flex-col gap-2 rounded-2xl border border-slate-200/95 bg-white p-1 shadow-sm sm:flex-row sm:items-center sm:gap-0 sm:pr-1 sm:shadow-md"
      >
        <div class="relative min-w-0 flex-1">
          <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="search"
            class="w-full rounded-xl border-0 bg-transparent py-3 pl-12 pr-11 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:ring-0 sm:py-3.5 sm:pl-14 sm:text-lg"
            placeholder="Buscar obras, artistas, salas…"
            aria-label="Buscar en el museo"
            autocomplete="off"
            @focus="showSuggestions = suggestions.length > 0"
            @input="onTyping"
            @keydown.escape="closeSuggestions"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
            aria-label="Limpiar"
            @click="clearSearch"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          class="shrink-0 rounded-xl bg-wine px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-wine-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2 sm:my-1 sm:mr-0.5"
        >
          Buscar
        </button>
      </div>
    </form>

    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="suggestions-dropdown"
      role="listbox"
      :aria-label="`Sugerencias (${suggestions.length})`"
    >
      <button
        v-for="s in suggestions"
        :key="s.id"
        type="button"
        class="suggestion-item w-full text-left"
        role="option"
        @mousedown.prevent="selectSuggestion(s)"
      >
        <span class="font-medium text-slate-800">{{ s.title }}</span>
        <span class="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{{ s.type }}</span>
      </button>
      <p class="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">Enter: ver todos los resultados filtrados por tu texto.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { buildDemoArtists, buildDemoGallery, buildDemoRooms } from '../../data/museumCollection';

const searchQuery = ref('');
const showSuggestions = ref(false);
const index = ref([]);

function buildSuggestionsIndex() {
  const out = [];
  buildDemoGallery().forEach((p) => {
    out.push({
      id: `art-${p.id}`,
      title: p.title,
      type: 'Obra',
      url: `/obra/${p.slug}`,
    });
  });
  buildDemoArtists().forEach((a) => {
    out.push({
      id: `artist-${a.id}`,
      title: String(a.name),
      type: 'Artista',
      url: `/artista/${a.id}`,
    });
  });
  buildDemoRooms().forEach((r) => {
    out.push({
      id: `room-${r.id}`,
      title: r.name,
      type: 'Sala',
      url: `/sala/${r.id}`,
    });
  });
  return out;
}

onMounted(() => {
  index.value = buildSuggestionsIndex();
  if (typeof window === 'undefined') return;
  const q = new URLSearchParams(window.location.search).get('q');
  if (q) searchQuery.value = q;
});

const suggestions = computed(() => {
  const term = searchQuery.value.trim().toLowerCase();
  if (term.length < 2) return [];
  return index.value.filter((item) => item.title.toLowerCase().includes(term)).slice(0, 8);
});

const onTyping = () => {
  showSuggestions.value = searchQuery.value.trim().length >= 2;
};

const closeSuggestions = () => {
  showSuggestions.value = false;
};

const clearSearch = () => {
  searchQuery.value = '';
  showSuggestions.value = false;
};

const goSearch = () => {
  showSuggestions.value = false;
  const q = searchQuery.value.trim();
  window.location.href = q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar';
};

const selectSuggestion = (s) => {
  showSuggestions.value = false;
  window.location.href = s.url;
};
</script>

<style scoped>
.search-bar-container {
  position: relative;
}

.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  z-index: 30;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgb(226 232 240 / 0.95);
  background: #fff;
  box-shadow:
    0 18px 40px rgb(15 23 42 / 0.09),
    0 0 0 1px rgb(255 255 255 / 0.65) inset;
}

.suggestion-item {
  @apply flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 text-left text-sm transition hover:bg-sky-50/60;
}

.suggestion-item:last-of-type {
  border-bottom: none;
}
</style>
