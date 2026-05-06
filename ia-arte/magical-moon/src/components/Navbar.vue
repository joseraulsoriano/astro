<template>
  <nav
    class="navbar fixed left-0 right-0 top-0 z-50 border-b border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-md backdrop-saturate-150"
    aria-label="Principal"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between md:h-[4.25rem]">
        <!-- Marca -->
        <a href="/" class="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2">
          <span
            class="hidden h-9 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-sky-400 via-wine to-slate-400 sm:block"
            aria-hidden="true"
          />
          <span class="font-display text-lg font-semibold tracking-tight text-slate-800 transition group-hover:text-wine sm:text-xl md:text-2xl">
            Museo Fragmentos
          </span>
        </a>

        <!-- Enlaces escritorio -->
        <div class="hidden items-center gap-7 md:flex">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="nav-link text-sm font-medium"
            :class="{ active: currentPath === item.href }"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- Acciones -->
        <div class="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            class="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
            aria-label="Abrir búsqueda"
            @click="openSearch"
          >
            <span class="sr-only">Buscar</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div v-if="isAuthenticated" class="hidden items-center gap-2 lg:flex">
            <a href="/dashboard" class="btn-ghost"> Panel </a>
            <a href="/subir-obra" class="btn-primary"> Subir </a>
            <div class="relative">
              <button
                type="button"
                class="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
                :aria-expanded="showUserMenu"
                aria-haspopup="true"
                aria-label="Menú de usuario"
                @click="toggleUserMenu"
              >
                <span
                  class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-wine"
                >
                  {{ userInitial }}
                </span>
              </button>
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
              >
                <a href="/dashboard#perfil" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Mi perfil</a>
                <a href="/dashboard#obras" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Mis obras</a>
                <hr class="my-2 border-slate-100" />
                <button type="button" class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50" @click="handleLogout">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          <div v-else class="hidden items-center gap-1 lg:flex">
            <a href="/auth/login" class="btn-ghost"> Entrar </a>
            <a href="/subir-obra" class="btn-primary"> Subir obra </a>
          </div>

          <button
            id="mobile-menu-toggle"
            type="button"
            class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-wine md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
            :aria-expanded="showMobileMenu"
            aria-controls="mobile-nav-panel"
            aria-label="Menú de navegación"
            @click="toggleMobileMenu"
          >
            <svg v-if="!showMobileMenu" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Móvil -->
      <div
        v-if="showMobileMenu"
        id="mobile-nav-panel"
        class="border-t border-slate-200 pb-4 pt-4 md:hidden"
        role="region"
        aria-label="Enlaces"
      >
        <div class="flex flex-col gap-1">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="mobile-link" @click="closeMobileMenu">
            {{ item.label }}
          </a>
          <div v-if="!isAuthenticated" class="mt-3 space-y-2 border-t border-slate-100 pt-3">
            <a href="/auth/login" class="mobile-secondary" @click="closeMobileMenu">Entrar</a>
            <a href="/subir-obra" class="mobile-primary" @click="closeMobileMenu">Subir obra</a>
          </div>
          <div v-else class="mt-3 space-y-2 border-t border-slate-100 pt-3">
            <a href="/dashboard" class="mobile-secondary" @click="closeMobileMenu">Panel</a>
            <button type="button" class="w-full px-4 py-2 text-left text-sm text-red-600" @click="handleLogout">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Búsqueda -->
    <div
      v-if="showSearch"
      class="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/45 px-4 pb-8 pt-[min(22vh,8rem)] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      @click.self="closeSearch"
    >
      <div class="w-full max-w-xl">
        <div class="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xl ring-1 ring-slate-200/50">
          <div class="mb-3 flex items-center justify-between gap-2">
            <h2 id="search-dialog-title" class="font-display text-lg font-semibold text-slate-800">Buscar</h2>
            <button
              type="button"
              class="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
              @click="closeSearch"
            >
              Cerrar
            </button>
          </div>
          <form class="flex flex-col gap-3 sm:flex-row sm:items-stretch" @submit.prevent="submitSearch">
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="Obra, artista, sala, técnica…"
              class="min-h-[3rem] flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-wine focus:bg-white focus:ring-2 focus:ring-wine/25"
              aria-label="Término de búsqueda"
              @keydown.escape.prevent="closeSearch"
            />
            <button type="submit" class="btn-submit shrink-0 rounded-xl px-6 py-3 font-semibold text-white shadow-md transition hover:bg-wine-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2">
              Buscar
            </button>
          </form>
          <p class="mt-3 text-xs text-slate-500">Enter navega a resultados. Esc cierra.</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/galeria', label: 'Galería' },
  { href: '/salas', label: 'Salas' },
  { href: '/artistas', label: 'Artistas' },
];

const showMobileMenu = ref(false);
const showUserMenu = ref(false);
const showSearch = ref(false);
const searchQuery = ref('');
const searchInputRef = ref(null);
const isAuthenticated = ref(false);
const currentPath = ref('/');

const userInitial = computed(() => 'U');

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  showUserMenu.value = false;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showMobileMenu.value = false;
};

const openSearch = () => {
  showMobileMenu.value = false;
  showSearch.value = true;
  nextTick(() => searchInputRef.value?.focus());
};

const closeSearch = () => {
  showSearch.value = false;
};

const submitSearch = () => {
  const q = searchQuery.value.trim();
  closeSearch();
  window.location.href = q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar';
};

const handleLogout = () => {
  isAuthenticated.value = false;
  showUserMenu.value = false;
  closeMobileMenu();
};

const handleClickOutside = (event) => {
  if (showUserMenu.value && !event.target.closest('.relative')) {
    showUserMenu.value = false;
  }
};

const handleKeydown = (event) => {
  if (event.key !== 'Escape') return;
  if (showSearch.value) closeSearch();
  if (showMobileMenu.value) closeMobileMenu();
};

watch([showMobileMenu, showSearch], () => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = showMobileMenu.value || showSearch.value ? 'hidden' : '';
});

onMounted(() => {
  currentPath.value = window.location.pathname;
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.navbar {
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.nav-link {
  @apply relative text-slate-600 transition hover:text-wine;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  height: 2px;
  width: 0;
  border-radius: 9999px;
  @apply bg-wine transition-[width] duration-300 ease-out;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  @apply text-wine;
}

.mobile-link {
  @apply rounded-lg px-4 py-2.5 text-slate-700 transition hover:bg-slate-50 hover:text-wine;
}

.btn-ghost {
  @apply rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-wine;
}

.btn-primary {
  @apply rounded-lg bg-wine px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-wine-dark;
}

.btn-submit {
  @apply bg-wine;
}

.mobile-secondary {
  @apply block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50;
}

.mobile-primary {
  @apply block w-full rounded-lg bg-wine py-3 text-center text-sm font-semibold text-white hover:bg-wine-dark;
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }
}
</style>
