<template>
  <!-- Welcome Modal/Guide -->
  <div v-if="showWelcome" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="closeWelcome">
    <div class="w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300">
      <!-- Header con gradiente vino -->
      <div class="bg-gradient-to-r from-wine to-wine-dark px-8 py-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">¡Bienvenido a Museo Fragmentos!</h2>
              <p class="text-white/80">Tu guía personal te dará un recorrido</p>
            </div>
          </div>
          <button @click="closeWelcome" class="text-white/80 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Contenido del Tour -->
      <div class="p-8 bg-white">
        <!-- Avatar del Anfitrión -->
        <div class="text-center mb-8">
          <div class="inline-block relative">
            <div class="w-24 h-24 bg-gradient-to-br from-wine/10 to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-white flex items-center justify-center">
              <svg class="w-4 h-4 text-wine" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Hola, soy tu guía</h3>
          <p class="text-gray-600">Estoy aquí para ayudarte a descubrir nuestro museo digital</p>
        </div>

        <!-- Pasos del Tour -->
        <div class="space-y-6 mb-8">
          <div v-for="(step, index) in tourSteps" :key="index" class="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent-light transition-colors">
            <div class="flex-shrink-0 w-10 h-10 bg-wine text-white rounded-full flex items-center justify-center font-bold">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
              <p class="text-gray-600 text-sm">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button @click="startTour" class="flex-1 bg-wine hover:bg-wine-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            <span>Empezar Tour Guiado</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button @click="skipTour" class="flex-1 border-2 border-gray-300 hover:border-wine text-gray-700 hover:text-wine px-6 py-3 rounded-lg font-semibold transition-colors">
            Explorar por mi cuenta
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tour Guiado Activo -->
  <div v-if="tourActive" class="fixed inset-0 z-50 pointer-events-none">
    <div v-for="(highlight, index) in highlights" :key="index" 
         v-show="currentStep === index"
         class="absolute pointer-events-auto"
         :style="{ top: highlight.top, left: highlight.left, width: highlight.width, height: highlight.height }">
      <div class="absolute inset-0 bg-wine/20 border-2 border-wine rounded-lg animate-pulse"></div>
      <div class="absolute -bottom-20 left-0 bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200">
        <p class="text-sm text-gray-700 font-medium">{{ highlight.message }}</p>
        <div class="flex gap-2 mt-3">
          <button @click="nextStep" class="px-4 py-2 bg-wine text-white rounded text-sm font-medium hover:bg-wine-dark">
            Siguiente
          </button>
          <button @click="endTour" class="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-wine hover:text-wine">
            Saltar Tour
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showWelcome = ref(false);
const tourActive = ref(false);
const currentStep = ref(0);

const tourSteps = [
  {
    title: 'Explora la Galería',
    description: 'Descubre miles de obras de arte sin necesidad de registro. Todo es completamente gratis.'
  },
  {
    title: 'Visualiza en 3D y AR',
    description: 'Cada obra puede verse en alta resolución, modelo 3D interactivo o en Realidad Aumentada.'
  },
  {
    title: 'Visita Salas Virtuales',
    description: 'Recorre exposiciones temáticas organizadas como en un museo físico.'
  },
  {
    title: 'Conoce a los Artistas',
    description: 'Explora perfiles de artistas y descubre sus colecciones completas.'
  }
];

const highlights = [
  { top: '20%', left: '10%', width: '200px', height: '60px', message: 'Aquí está el menú principal. Puedes navegar por todas las secciones.' },
  { top: '30%', left: '50%', width: '300px', height: '200px', message: 'Estas son las obras destacadas. Haz clic para ver más detalles.' },
];

const closeWelcome = () => {
  showWelcome.value = false;
  localStorage.setItem('magical-moon-welcome-seen', 'true');
};

const startTour = () => {
  showWelcome.value = false;
  tourActive.value = true;
  currentStep.value = 0;
};

const nextStep = () => {
  if (currentStep.value < highlights.length - 1) {
    currentStep.value++;
  } else {
    endTour();
  }
};

const skipTour = () => {
  showWelcome.value = false;
  tourActive.value = false;
  localStorage.setItem('magical-moon-welcome-seen', 'true');
  localStorage.setItem('magical-moon-tour-skipped', 'true');
};

const endTour = () => {
  tourActive.value = false;
  localStorage.setItem('magical-moon-tour-completed', 'true');
};

onMounted(() => {
  // Mostrar bienvenida solo la primera vez
  const welcomeSeen = localStorage.getItem('magical-moon-welcome-seen');
  if (!welcomeSeen) {
    setTimeout(() => {
      showWelcome.value = true;
    }, 500);
  }
});
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

