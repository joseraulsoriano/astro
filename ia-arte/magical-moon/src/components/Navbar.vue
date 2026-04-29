<template>
  <nav class="navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-sm" aria-label="Principal">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="logo-icon">
            <svg class="w-8 h-8 md:w-10 md:h-10 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <a href="/" class="flex flex-col">
            <span class="text-xl md:text-2xl font-bold text-wine">Museo Fragmentos</span>
            <span class="text-xs text-gray-600">Museo Digital</span>
          </a>
        </div>

        <!-- Navigation Links (Desktop) -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="/" class="nav-link" :class="{ 'active': currentPath === '/' }">
            Inicio
          </a>
          <a href="/galeria" class="nav-link" :class="{ 'active': currentPath === '/galeria' }">
            Galería
          </a>
          <a href="/salas" class="nav-link" :class="{ 'active': currentPath === '/salas' }">
            Salas Virtuales
          </a>
          <a href="/artistas" class="nav-link" :class="{ 'active': currentPath === '/artistas' }">
            Artistas
          </a>
          <a href="/sobre-nosotros" class="nav-link" :class="{ 'active': currentPath === '/sobre-nosotros' }">
            Nosotros
          </a>
        </div>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Icon -->
          <button
            type="button"
            @click="toggleSearch"
            class="p-2 text-gray-600 hover:text-wine transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
            aria-label="Abrir búsqueda"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- User Menu (if logged in) -->
          <div v-if="isAuthenticated" class="hidden md:flex items-center space-x-3">
            <a href="/dashboard" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-wine transition-colors">
              Dashboard
            </a>
            <a
              href="/subir-obra"
              class="px-4 py-2 text-sm font-medium bg-wine hover:bg-wine-dark text-white rounded-lg transition-colors inline-block text-center"
            >
              Subir Obra
            </a>
            <div class="relative">
              <button
                type="button"
                @click="toggleUserMenu"
                class="flex items-center space-x-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
                :aria-expanded="showUserMenu"
                aria-haspopup="true"
                aria-label="Menú de usuario"
              >
                <div class="w-8 h-8 rounded-full bg-white border-2 border-wine flex items-center justify-center">
                  <span class="text-wine text-sm font-bold">{{ userInitial }}</span>
                </div>
              </button>
              <!-- Dropdown Menu -->
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2">
                <a href="/dashboard#perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-wine/5">Mi Perfil</a>
                <a href="/dashboard#obras" class="block px-4 py-2 text-sm text-gray-700 hover:bg-wine/5">Mis Obras</a>
                <a href="/dashboard#colecciones" class="block px-4 py-2 text-sm text-gray-700 hover:bg-wine/5">Colecciones</a>
                <hr class="my-2 border-gray-200">
                <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cerrar Sesión</button>
              </div>
            </div>
          </div>

          <!-- Login Button (if not logged in) -->
          <div v-else class="hidden md:flex items-center space-x-3">
            <a href="/galeria" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-wine transition-colors">
              Explorar Gratis
            </a>
            <a href="/auth/login" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-wine transition-colors">
              Iniciar Sesión
            </a>
            <a href="/subir-obra" class="px-4 py-2 text-sm font-semibold bg-wine text-white hover:bg-wine-dark rounded-lg transition-colors">
              Subir Obras
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            id="mobile-menu-toggle"
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-wine transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
            :aria-expanded="showMobileMenu"
            aria-controls="mobile-nav-panel"
            aria-label="Menú de navegación"
          >
            <svg v-if="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

          <!-- Mobile Menu -->
      <div
        v-if="showMobileMenu"
        id="mobile-nav-panel"
        class="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4"
        role="region"
        aria-label="Enlaces de navegación"
      >
        <div class="flex flex-col space-y-3">
          <a href="/" class="nav-link-mobile" @click="closeMobileMenu">Inicio</a>
          <a href="/galeria" class="nav-link-mobile" @click="closeMobileMenu">Galería</a>
          <a href="/salas" class="nav-link-mobile" @click="closeMobileMenu">Salas Virtuales</a>
          <a href="/artistas" class="nav-link-mobile" @click="closeMobileMenu">Artistas</a>
          <a href="/sobre-nosotros" class="nav-link-mobile" @click="closeMobileMenu">Nosotros</a>
          <div v-if="!isAuthenticated" class="pt-4 space-y-2 border-t border-gray-200">
            <a href="/galeria" class="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-wine/5 rounded-lg transition-colors text-left">
              Explorar Gratis
            </a>
            <a href="/auth/login" class="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-wine/5 rounded-lg transition-colors text-left">
              Iniciar Sesión
            </a>
            <a href="/subir-obra" class="block w-full px-4 py-2 text-sm font-semibold bg-wine text-white hover:bg-wine-dark rounded-lg transition-colors text-center">
              Subir Obras
            </a>
          </div>
          <div v-else class="pt-4 space-y-2 border-t border-gray-200">
            <a href="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-wine/5 rounded-lg">Dashboard</a>
            <a href="/subir-obra" class="block w-full px-4 py-2 text-sm font-semibold bg-wine text-white hover:bg-wine-dark rounded-lg transition-colors text-center">
              Subir Obra
            </a>
            <button @click="handleLogout" class="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Overlay -->
    <div
      v-if="showSearch"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-24 md:pt-32 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      @click.self="closeSearch"
    >
      <div class="w-full max-w-2xl mx-auto">
        <p id="search-dialog-title" class="sr-only">Buscar en el museo</p>
        <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-xl">
          <input
            ref="searchInputRef"
            type="search"
            v-model="searchQuery"
            placeholder="Buscar obras, artistas, salas..."
            class="w-full bg-transparent border-none outline-none text-gray-900 text-lg placeholder-gray-400 focus:ring-0"
            autocomplete="off"
            aria-label="Término de búsqueda"
            @keydown.enter.prevent="submitSearch"
            @keyup.esc="closeSearch"
          />
          <p class="text-xs text-gray-500 mt-2">Pulsa Enter para ir a la página de búsqueda. Esc para cerrar.</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const showMobileMenu = ref(false);
const showUserMenu = ref(false);
const showSearch = ref(false);
const searchQuery = ref('');
const searchInputRef = ref(null);
const isAuthenticated = ref(false); // TODO: Conectar con auth real
const currentPath = ref('/');

const userInitial = computed(() => {
  // TODO: Obtener del usuario autenticado
  return 'U';
});

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

const toggleSearch = () => {
  showMobileMenu.value = false;
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => searchInputRef.value?.focus());
  }
};

const closeSearch = () => {
  showSearch.value = false;
};

const submitSearch = () => {
  const q = searchQuery.value.trim();
  closeSearch();
  window.location.href = q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar';
};

const handleLogin = () => {
  // TODO: Implementar login
  console.log('Login clicked');
};

const handleLogout = () => {
  // TODO: Implementar logout
  isAuthenticated.value = false;
  showUserMenu.value = false;
  closeMobileMenu();
};

// Cerrar menús al hacer clic fuera
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
  document.body.style.overflow =
    showMobileMenu.value || showSearch.value ? 'hidden' : '';
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
  transition: all 0.3s ease;
}

.nav-link {
  @apply text-gray-700 hover:text-wine transition-colors relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #722F37;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  @apply text-wine;
}

.nav-link-mobile {
  @apply block px-4 py-2 text-gray-700 hover:text-wine hover:bg-wine/5 rounded-lg transition-colors;
}

.logo-icon {
  animation: float 3s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .logo-icon {
    animation: none;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>

